import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { createHash, randomBytes, randomInt } from 'crypto';
import {
  AcademyRegistrationFeeCategory,
  AcademyAssessmentType,
  AcademyQuestionType,
  AcademyApplicantTokenPurpose,
  ByuPathwayTokenPurpose,
  PaymentProvider,
  Prisma,
} from '../../generated/prisma/client';
import { EmailService } from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';
import { SettingsService } from '../settings/settings.service';
import { StorageService } from '../storage/storage.service';
import {
  BeginAcademyLearnerAccountInput,
  BeginByuPathwayVerificationInput,
  CompleteByuContinuationInput,
  InitiateAcademyMobileMoneyPaymentInput,
  CreateAcademyAssessmentInput,
  AddAcademyAssessmentQuestionInput,
  SubmitAcademyAssessmentInput,
  ReviewByuPathwayVerificationInput,
  VerifyAcademyLearnerEmailInput,
  VerifyByuPathwayEmailInput,
  StartByuPathwayProofInput,
  ActivateAcademyApplicantInput,
} from './academy-lifecycle.types';

type Identity = { id: string; email: string };

@Injectable()
export class AcademyLifecycleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly settings: SettingsService,
    private readonly email: EmailService,
    private readonly config: ConfigService,
    private readonly storage: StorageService,
  ) {}

  async listPublicCourses() {
    return this.prisma.academyCourse.findMany({
      where: { isActive: true },
      select: { id: true, code: true, title: true, description: true, durationWeeks: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async beginLearnerAccount(input: BeginAcademyLearnerAccountInput) {
    const email = this.normalizedEmail(input.email);
    await this.ensureCourse(input.courseId);
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException('An account already exists for this email. Please sign in.');
    }
    const code = this.code();
    const fee = await this.firstTimeApplicantFee();
    const applicant = await this.prisma.$transaction(async (tx) => {
      const pending = await tx.academyApplicant.findFirst({
        where: { email, courseId: input.courseId, createdUserId: null },
        orderBy: { createdAt: 'desc' },
      });
      const applicant = pending
        ? await tx.academyApplicant.update({
            where: { id: pending.id },
            data: {
              firstName: null, lastName: null, passwordHash: null, emailVerifiedAt: null,
              feeCategory: fee.category, feeAmount: fee.amount, currency: fee.currency,
            },
          })
        : await tx.academyApplicant.create({
        data: {
          email,
          passwordHash: null,
          firstName: null,
          lastName: null,
          courseId: input.courseId,
          feeCategory: fee.category,
          feeAmount: fee.amount,
          currency: fee.currency,
        },
      });
      await tx.academyApplicantVerificationToken.updateMany({
        where: { applicantId: applicant.id, purpose: AcademyApplicantTokenPurpose.EMAIL_VERIFICATION, usedAt: null }, data: { usedAt: new Date() },
      });
      await tx.academyApplicantVerificationToken.create({
        data: { applicantId: applicant.id, purpose: AcademyApplicantTokenPurpose.EMAIL_VERIFICATION, tokenHash: this.hash(code), expiresAt: this.afterMinutes(15) },
      });
      return applicant;
    });

    await this.email.send({
      to: email,
      subject: 'Verify your Katel Academy email',
      text: `Your Katel Academy verification code is ${code}. It expires in 15 minutes.`,
    });
    return this.dispatch(applicant.id, email, code);
  }

  async verifyLearnerAccount(input: VerifyAcademyLearnerEmailInput) {
    const token = await this.prisma.academyApplicantVerificationToken.findFirst({
      where: { applicantId: input.applicantId, purpose: AcademyApplicantTokenPurpose.EMAIL_VERIFICATION, usedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { expiresAt: 'desc' },
    });
    if (!token || !this.hashesMatch(token.tokenHash, this.hash(input.code))) {
      throw new BadRequestException('This verification code is invalid or has expired.');
    }
    await this.prisma.$transaction([
      this.prisma.academyApplicantVerificationToken.update({ where: { id: token.id }, data: { usedAt: new Date() } }),
      this.prisma.academyApplicant.update({
        where: { id: token.applicantId },
        data: { emailVerifiedAt: new Date() },
      }),
    ]);
    const applicant = await this.prisma.academyApplicant.findUniqueOrThrow({ where: { id: input.applicantId } });
    return this.applicantRecord(applicant);
  }

  async startRegistration(user: Identity, courseId: string) {
    const course = await this.ensureCourse(courseId);
    const existing = await this.prisma.academyRegistration.findFirst({
      where: { userId: user.id, courseId, status: { in: ['OPEN', 'IN_PROGRESS'] } },
      orderBy: { createdAt: 'desc' },
    });
    if (existing) return this.registrationRecord(existing);

    const fee = await this.determineFee(user.id, user.email, course.id);
    const registration = await this.prisma.academyRegistration.create({
      data: {
        userId: user.id,
        courseId: course.id,
        feeCategory: fee.category,
        feeAmount: fee.amount,
        currency: fee.currency,
      },
    });
    return this.registrationRecord(registration);
  }

  async feeQuote(user: Identity, courseId: string) {
    await this.ensureCourse(courseId);
    return this.determineFee(user.id, user.email, courseId);
  }

  async startByuProof(input: StartByuPathwayProofInput) {
    const applicant = await this.prisma.academyApplicant.findUnique({ where: { id: input.applicantId } });
    if (!applicant?.emailVerifiedAt || applicant.createdUserId) {
      throw new BadRequestException('Verify the Academy application email before requesting the BYU Pathway fee.');
    }
    const submissionToken = this.token();
    const expiresAt = this.afterMinutes(30);
    const verification = await this.prisma.$transaction(async (tx) => {
      const record = applicant.byuPathwayVerificationId
        ? await tx.byuPathwayVerification.update({
            where: { id: applicant.byuPathwayVerificationId },
            data: { status: 'EMAIL_VERIFIED', emailVerifiedAt: applicant.emailVerifiedAt, proofDocumentId: null, reviewedAt: null, reviewedById: null, rejectionReason: null, reviewNote: null },
          })
        : await tx.byuPathwayVerification.create({ data: { email: applicant.email, emailVerifiedAt: applicant.emailVerifiedAt, status: 'EMAIL_VERIFIED' } });
      if (!applicant.byuPathwayVerificationId) {
        await tx.academyApplicant.update({ where: { id: applicant.id }, data: { byuPathwayVerificationId: record.id } });
      }
      await tx.byuPathwayVerificationToken.create({
        data: { verificationId: record.id, purpose: ByuPathwayTokenPurpose.PROOF_SUBMISSION, tokenHash: this.hash(submissionToken), expiresAt },
      });
      return record;
    });
    return { verificationId: verification.id, submissionToken, expiresAt };
  }

  async beginByuVerification(input: BeginByuPathwayVerificationInput) {
    const email = this.normalizedEmail(input.email);
    const code = this.code();
    const verification = await this.prisma.byuPathwayVerification.create({
      data: {
        email,
        tokens: {
          create: {
            purpose: ByuPathwayTokenPurpose.EMAIL_VERIFICATION,
            tokenHash: this.hash(code),
            expiresAt: this.afterMinutes(15),
          },
        },
      },
    });
    await this.email.send({
      to: email,
      subject: 'Verify your BYU Pathway application email',
      text: `Your Katel BYU Pathway verification code is ${code}. It expires in 15 minutes.`,
    });
    return this.dispatch(verification.id, email, code);
  }

  async verifyByuEmail(input: VerifyByuPathwayEmailInput) {
    const token = await this.prisma.byuPathwayVerificationToken.findFirst({
      where: {
        verificationId: input.verificationId,
        purpose: ByuPathwayTokenPurpose.EMAIL_VERIFICATION,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { expiresAt: 'desc' },
    });
    if (
      !token ||
      !this.hashesMatch(token.tokenHash, this.hash(input.code))
    ) {
      throw new BadRequestException('This verification code is invalid or has expired.');
    }
    const submissionToken = this.token();
    const expiresAt = this.afterMinutes(30);
    await this.prisma.$transaction(async (tx) => {
      await tx.byuPathwayVerificationToken.update({ where: { id: token.id }, data: { usedAt: new Date() } });
      await tx.byuPathwayVerificationToken.create({
        data: {
          verificationId: input.verificationId,
          purpose: ByuPathwayTokenPurpose.PROOF_SUBMISSION,
          tokenHash: this.hash(submissionToken),
          expiresAt,
        },
      });
      await tx.byuPathwayVerification.update({
        where: { id: input.verificationId },
        data: { emailVerifiedAt: new Date(), status: 'EMAIL_VERIFIED' },
      });
    });
    return { verificationId: input.verificationId, submissionToken, expiresAt };
  }

  async listByuReviews() {
    const records = await this.prisma.byuPathwayVerification.findMany({
      where: { status: 'UNDER_REVIEW' },
      include: { proofDocument: true },
      orderBy: { createdAt: 'asc' },
    });
    return records.map((item) => this.byuRecord(item));
  }

  async reviewByuVerification(reviewerId: string, input: ReviewByuPathwayVerificationInput) {
    const verification = await this.prisma.byuPathwayVerification.findUnique({
      where: { id: input.verificationId },
      include: { proofDocument: true },
    });
    if (!verification) throw new NotFoundException('BYU Pathway verification was not found.');
    if (verification.status !== 'UNDER_REVIEW' || !verification.proofDocumentId) {
      throw new BadRequestException('Only submitted BYU proof can be reviewed.');
    }
    if (!input.approved && !input.rejectionReason?.trim()) {
      throw new BadRequestException('A rejection reason is required.');
    }

    const updated = await this.prisma.byuPathwayVerification.update({
      where: { id: verification.id },
      data: {
        status: input.approved ? 'APPROVED' : 'REJECTED',
        reviewedById: reviewerId,
        reviewedAt: new Date(),
        rejectionReason: input.approved ? null : input.rejectionReason!.trim(),
        reviewNote: input.reviewNote?.trim() || null,
      },
      include: { proofDocument: true },
    });

    if (!input.approved) {
      await this.email.send({
        to: updated.email,
        subject: 'Katel BYU Pathway verification decision',
        text: `Your BYU Pathway fee request was not approved. Reason: ${updated.rejectionReason}`,
      });
      return this.byuRecord(updated);
    }

    const continuationToken = this.token();
    await this.prisma.byuPathwayVerificationToken.create({
      data: {
        verificationId: updated.id,
        purpose: ByuPathwayTokenPurpose.REGISTRATION_CONTINUATION,
        tokenHash: this.hash(continuationToken),
        expiresAt: this.afterMinutes(60 * 24 * 7),
      },
    });
    const publicUrl = this.config.get<string>('APP_PUBLIC_URL') ?? 'http://localhost:5173';
    await this.email.send({
      to: updated.email,
      subject: 'Your Katel BYU Pathway fee has been approved',
      text: `Your reduced Academy fee has been approved. Continue your registration: ${publicUrl}/academy/byu/continue?token=${continuationToken}`,
    });
    return this.byuRecord(updated);
  }

  async completeByuContinuation(input: CompleteByuContinuationInput) {
    const continuation = await this.prisma.byuPathwayVerificationToken.findUnique({
      where: { tokenHash: this.hash(input.continuationToken) },
      include: { verification: true },
    });
    if (
      !continuation ||
      continuation.purpose !== ByuPathwayTokenPurpose.REGISTRATION_CONTINUATION ||
      continuation.usedAt ||
      continuation.expiresAt <= new Date() ||
      continuation.verification.status !== 'APPROVED'
    ) {
      throw new BadRequestException('This continuation link is invalid or has expired.');
    }
    const fee = await this.byuApplicantFee();
    const applicant = await this.prisma.$transaction(async (tx) => {
      await tx.byuPathwayVerificationToken.update({ where: { id: continuation.id }, data: { usedAt: new Date() } });
      const existing = await tx.academyApplicant.findUnique({ where: { byuPathwayVerificationId: continuation.verificationId } });
      if (!existing) throw new NotFoundException('The original Academy application was not found. Start the course registration again.');
      return tx.academyApplicant.update({
        where: { id: existing.id },
        data: { feeCategory: fee.category, feeAmount: fee.amount, currency: fee.currency },
      });
    });
    return this.applicantRecord(applicant);
  }

  async initiateMobileMoney(input: InitiateAcademyMobileMoneyPaymentInput) {
    const applicant = await this.prisma.academyApplicant.findUnique({
      where: { id: input.applicantId }, include: { payment: true },
    });
    if (!applicant || applicant.createdUserId) throw new NotFoundException('This Academy application is no longer available for payment.');
    if (!applicant.emailVerifiedAt) throw new ForbiddenException('Verify the applicant email before requesting payment.');

    const providerReference = `${input.provider === PaymentProvider.MTN_MOMO ? 'MTN' : 'AIRTEL'}-MOCK-${randomBytes(9).toString('hex').toUpperCase()}`;
    const payment = applicant.payment
      ? await this.prisma.payment.update({
          where: { id: applicant.payment.id },
          data: { provider: input.provider, payerPhone: input.phone.trim(), providerReference, providerStatus: 'PENDING', status: 'IN_PROGRESS', failedAt: null, failureReason: null },
        })
      : await this.prisma.$transaction(async (tx) => {
          const created = await tx.payment.create({
            data: {
              reference: `ACA-${randomBytes(8).toString('hex').toUpperCase()}`,
              amount: applicant.feeAmount,
              currency: applicant.currency,
              purpose: `ACADEMY_APPLICATION:${applicant.id}`,
              provider: input.provider,
              payerPhone: input.phone.trim(),
              providerReference,
              providerStatus: 'PENDING',
              status: 'IN_PROGRESS',
            },
          });
          await tx.academyApplicant.update({ where: { id: applicant.id }, data: { paymentId: created.id } });
          return created;
        });
    return this.applicantPaymentRecord(payment, applicant.id);
  }

  async confirmMockMobileMoney(paymentId: string) {
    if (this.config.get<string>('NODE_ENV') === 'production' && this.config.get<string>('PAYMENT_MODE') !== 'mock') {
      throw new ForbiddenException('Payment confirmation is performed by the payment provider.');
    }
    const result = await this.prisma.$transaction(async (tx) => {
      const applicant = await tx.academyApplicant.findFirst({
        where: { paymentId }, include: { payment: true, createdUser: true },
      });
      if (!applicant?.payment) throw new NotFoundException('Academy payment was not found.');
      if (applicant.createdUser) {
        return { payment: applicant.payment, activationToken: null };
      }
      if (!applicant.emailVerifiedAt || applicant.payment.providerStatus !== 'PENDING') throw new BadRequestException('This payment cannot be confirmed.');

      const now = new Date();
      const confirmed = await tx.payment.update({
        where: { id: applicant.payment.id },
        data: { providerStatus: 'CONFIRMED', status: 'APPROVED', confirmedAt: now, confirmationPayload: { mode: 'mock', providerReference: applicant.payment.providerReference } },
      });
      const activationToken = this.token();
      await tx.academyApplicantVerificationToken.updateMany({ where: { applicantId: applicant.id, purpose: AcademyApplicantTokenPurpose.PAYMENT_ACTIVATION, usedAt: null }, data: { usedAt: now } });
      await tx.academyApplicantVerificationToken.create({ data: { applicantId: applicant.id, purpose: AcademyApplicantTokenPurpose.PAYMENT_ACTIVATION, tokenHash: this.hash(activationToken), expiresAt: this.afterMinutes(60 * 24 * 7) } });
      return { payment: confirmed, activationToken };
    });
    if (result.activationToken) {
      const applicant = await this.prisma.academyApplicant.findFirstOrThrow({ where: { paymentId } });
      const publicUrl = this.config.get<string>('APP_PUBLIC_URL') ?? 'http://localhost:5173';
      await this.email.send({
        to: applicant.email,
        subject: 'Activate your Katel Academy account',
        text: `Your Academy payment is confirmed. Complete your account: ${publicUrl}/academy/activate?token=${result.activationToken}&email=${encodeURIComponent(applicant.email)}`,
      });
    }
    return { payment: this.applicantPaymentRecord(result.payment, null), enrollment: null, activationEmailSent: true };
  }

  async activateApplicant(input: ActivateAcademyApplicantInput) {
    const token = await this.prisma.academyApplicantVerificationToken.findUnique({
      where: { tokenHash: this.hash(input.token) }, include: { applicant: { include: { payment: true, course: true } } },
    });
    if (!token || token.purpose !== AcademyApplicantTokenPurpose.PAYMENT_ACTIVATION || token.usedAt || token.expiresAt <= new Date() || !token.applicant.payment || token.applicant.payment.providerStatus !== 'CONFIRMED') {
      throw new BadRequestException('This Academy activation link is invalid or has expired.');
    }
    if (token.applicant.createdUserId) throw new ConflictException('This Academy account has already been activated. Please sign in.');
    const result = await this.prisma.$transaction(async (tx) => {
      const role = await tx.role.findUnique({ where: { name: 'ACADEMY_LEARNER' } });
      if (!role) throw new BadRequestException('Academy learner role has not been configured.');
      if (await tx.user.findUnique({ where: { email: token.applicant.email } })) throw new ConflictException('An account already exists for this email. Please sign in.');
      const now = new Date();
      const user = await tx.user.create({ data: { email: token.applicant.email, firstName: input.firstName.trim(), lastName: input.lastName.trim(), passwordHash: await argon2.hash(input.password), roleId: role.id, status: 'ACTIVE', emailVerifiedAt: token.applicant.emailVerifiedAt } });
      const registration = await tx.academyRegistration.create({ data: { userId: user.id, courseId: token.applicant.courseId, paymentId: token.applicant.paymentId!, status: 'APPROVED', verifiedAt: now, feeCategory: token.applicant.feeCategory, feeAmount: token.applicant.feeAmount, currency: token.applicant.currency } });
      const enrollment = await tx.academyEnrollment.create({ data: { userId: user.id, courseId: token.applicant.courseId, registrationId: registration.id, status: 'ENROLLED', enrolledAt: now, expiresAt: new Date(now.getTime() + token.applicant.course.durationWeeks * 7 * 24 * 60 * 60 * 1000) } });
      await tx.academyApplicant.update({ where: { id: token.applicantId }, data: { firstName: input.firstName.trim(), lastName: input.lastName.trim(), passwordHash: user.passwordHash, createdUserId: user.id } });
      await tx.academyApplicantVerificationToken.update({ where: { id: token.id }, data: { usedAt: now } });
      if (token.applicant.byuPathwayVerificationId) await tx.byuPathwayVerification.update({ where: { id: token.applicant.byuPathwayVerificationId }, data: { userId: user.id } });
      return enrollment;
    });
    return this.enrollmentRecord(result);
  }

  async createAssessment(input: CreateAcademyAssessmentInput) {
    await this.ensureCourse(input.courseId);
    if (input.type === AcademyAssessmentType.FINAL_EXAM && input.sessionId) {
      throw new BadRequestException('A final exam is course-level and cannot belong to a session.');
    }
    if (input.sessionId) {
      const session = await this.prisma.academySession.findFirst({ where: { id: input.sessionId, week: { courseId: input.courseId } } });
      if (!session) throw new BadRequestException('The selected session does not belong to this course.');
    }
    if (input.type === AcademyAssessmentType.FINAL_EXAM) {
      const existing = await this.prisma.academyAssessment.findFirst({ where: { courseId: input.courseId, type: AcademyAssessmentType.FINAL_EXAM } });
      if (existing) throw new ConflictException('This course already has a final exam.');
    }
    if (input.maximumScore !== undefined && input.maximumScore <= 0) throw new BadRequestException('Maximum score must be greater than zero.');
    if (input.passingScore !== undefined && (input.passingScore < 0 || input.passingScore > 100)) throw new BadRequestException('Passing score must be between 0 and 100.');
    return this.prisma.academyAssessment.create({
      data: {
        courseId: input.courseId,
        sessionId: input.sessionId || null,
        type: input.type,
        title: input.title.trim(),
        description: input.description?.trim() || null,
        maximumScore: input.maximumScore,
        passingScore: input.passingScore,
      },
    });
  }

  async addAssessmentQuestion(input: AddAcademyAssessmentQuestionInput) {
    const assessment = await this.prisma.academyAssessment.findUnique({ where: { id: input.assessmentId }, include: { questions: true } });
    if (!assessment) throw new NotFoundException('Academy assessment was not found.');
    if (!Number.isInteger(input.points) || input.points < 1) throw new BadRequestException('Question points must be at least 1.');
    const options = input.options.map((option) => option.trim()).filter(Boolean);
    if (options.length < 2) throw new BadRequestException('At least two answer options are required.');
    if (!input.correctOptionIndexes.length || input.correctOptionIndexes.some((index) => index < 0 || index >= options.length)) {
      throw new BadRequestException('Select at least one valid correct answer.');
    }
    if (input.type === AcademyQuestionType.SINGLE_CHOICE && input.correctOptionIndexes.length !== 1) {
      throw new BadRequestException('Single-choice questions require exactly one correct answer.');
    }
    const question = await this.prisma.academyQuestion.create({
      data: {
        prompt: input.prompt.trim(),
        type: input.type,
        points: input.points,
        gradingMode: 'AUTOMATIC',
        options: { create: options.map((text, order) => ({ text, order: order + 1, isCorrect: input.correctOptionIndexes.includes(order) })) },
      },
      include: { options: { orderBy: { order: 'asc' } } },
    });
    await this.prisma.academyAssessmentQuestion.create({
      data: { assessmentId: assessment.id, questionId: question.id, order: assessment.questions.length + 1 },
    });
    return question;
  }

  async publishAssessment(id: string) {
    const assessment = await this.prisma.academyAssessment.findUnique({ where: { id }, include: { questions: true } });
    if (!assessment) throw new NotFoundException('Academy assessment was not found.');
    if (!assessment.questions.length) throw new BadRequestException('Add at least one question before publishing an assessment.');
    return this.prisma.academyAssessment.update({ where: { id }, data: { status: 'PUBLISHED' } });
  }

  async markContentBlockComplete(userId: string, contentBlockId: string) {
    const block = await this.prisma.academyContentBlock.findUnique({
      where: { id: contentBlockId },
      include: { session: { include: { week: true } } },
    });
    if (!block || !block.isActive || block.status !== 'PUBLISHED') throw new NotFoundException('Published content block was not found.');
    const enrollment = await this.activeEnrollment(userId, block.session.week.courseId);
    await this.prisma.academyContentBlockProgress.upsert({
      where: { enrollmentId_contentBlockId: { enrollmentId: enrollment.id, contentBlockId } },
      update: { startedAt: new Date(), completedAt: new Date() },
      create: { enrollmentId: enrollment.id, contentBlockId, startedAt: new Date(), completedAt: new Date() },
    });
    return this.refreshProgress(enrollment.id);
  }

  async startAssessment(userId: string, assessmentId: string) {
    const assessment = await this.prisma.academyAssessment.findFirst({
      where: { id: assessmentId, isActive: true, status: 'PUBLISHED' },
      include: { questions: { orderBy: { order: 'asc' }, include: { question: { include: { options: { orderBy: { order: 'asc' } } } } } } },
    });
    if (!assessment) throw new NotFoundException('Published Academy assessment was not found.');
    const enrollment = await this.activeEnrollment(userId, assessment.courseId);
    const inProgress = await this.prisma.academyAssessmentAttempt.findFirst({ where: { enrollmentId: enrollment.id, assessmentId, status: 'IN_PROGRESS' }, orderBy: { attemptNumber: 'desc' } });
    const attempt = inProgress ?? await this.prisma.academyAssessmentAttempt.create({
      data: { enrollmentId: enrollment.id, assessmentId, attemptNumber: (await this.prisma.academyAssessmentAttempt.count({ where: { enrollmentId: enrollment.id, assessmentId } })) + 1 },
    });
    return {
      id: attempt.id,
      assessmentId,
      assessmentType: assessment.type,
      title: assessment.title,
      status: attempt.status,
      questions: assessment.questions.map(({ question }) => ({ id: question.id, prompt: question.prompt, type: question.type, points: question.points, options: question.options.map(({ id, text, order }) => ({ id, text, order })) })),
    };
  }

  async listLearnerAssessments(userId: string, courseId: string) {
    await this.activeEnrollment(userId, courseId);
    const records = await this.prisma.academyAssessment.findMany({
      where: { courseId, isActive: true, status: 'PUBLISHED' },
      select: { id: true, type: true, title: true, description: true, passingScore: true },
      orderBy: [{ type: 'asc' }, { createdAt: 'asc' }],
    });
    return records.map((record) => ({ ...record, passingScore: record.passingScore === null ? null : Number(record.passingScore) }));
  }

  async submitAssessment(userId: string, input: SubmitAcademyAssessmentInput) {
    const attempt = await this.prisma.academyAssessmentAttempt.findFirst({
      where: { id: input.attemptId, enrollment: { userId } },
      include: { enrollment: true, assessment: { include: { questions: { include: { question: { include: { options: true } } } } } } },
    });
    if (!attempt) throw new NotFoundException('Assessment attempt was not found.');
    if (attempt.status !== 'IN_PROGRESS') throw new BadRequestException('This assessment attempt has already been submitted.');
    await this.ensureEnrollmentNotExpired(attempt.enrollment);
    const answerMap = new Map(input.answers.map((answer) => [answer.questionId, answer.optionIds.sort()]));
    let earned = 0;
    let total = 0;
    const responses: Prisma.AcademyQuestionResponseCreateManyInput[] = [];
    for (const item of attempt.assessment.questions) {
      const question = item.question;
      const expected = question.options.filter((option) => option.isCorrect).map((option) => option.id).sort();
      const answer = answerMap.get(question.id) ?? [];
      const correct = expected.length === answer.length && expected.every((id, index) => id === answer[index]);
      const points = Number(question.points);
      total += points;
      if (correct) earned += points;
      responses.push({ attemptId: attempt.id, questionId: question.id, answer, score: correct ? points : 0, isCorrect: correct, gradedAt: new Date() });
    }
    const percentage = total ? (earned / total) * 100 : 0;
    const threshold = Number(attempt.assessment.passingScore ?? 50);
    const passed = percentage >= threshold;
    const now = new Date();
    const updatedEnrollment = await this.prisma.$transaction(async (tx) => {
      await tx.academyQuestionResponse.createMany({ data: responses });
      await tx.academyAssessmentAttempt.update({ where: { id: attempt.id }, data: { status: 'GRADED', score: earned, maximumScore: total, percentage, passed, submittedAt: now, gradedAt: now } });
      if (attempt.assessment.type !== AcademyAssessmentType.FINAL_EXAM) return tx.academyEnrollment.update({ where: { id: attempt.enrollmentId }, data: { status: 'IN_PROGRESS' } });
      if (!passed) return tx.academyEnrollment.update({ where: { id: attempt.enrollmentId }, data: { status: 'FAILED' } });
      const enrollment = await tx.academyEnrollment.update({ where: { id: attempt.enrollmentId }, data: { status: 'COMPLETED', completedAt: now, progressPercent: 100 } });
      await tx.academyCompletion.upsert({
        where: { enrollmentId: enrollment.id },
        update: { finalScore: percentage, completionDate: now, status: 'COMPLETED' },
        create: { enrollmentId: enrollment.id, userId, courseId: enrollment.courseId, completionCode: `KA-${now.getFullYear()}-${randomBytes(5).toString('hex').toUpperCase()}`, completionDate: now, finalScore: percentage },
      });
      return enrollment;
    });
    return { passed, percentage, enrollment: this.enrollmentRecord(updatedEnrollment) };
  }

  private async activeEnrollment(userId: string, courseId: string) {
    const enrollment = await this.prisma.academyEnrollment.findFirst({
      where: { userId, courseId, status: { in: ['ENROLLED', 'IN_PROGRESS'] } },
      orderBy: { enrolledAt: 'desc' },
    });
    if (!enrollment) throw new ForbiddenException('You do not have active access to this course.');
    await this.ensureEnrollmentNotExpired(enrollment);
    return enrollment;
  }

  private async ensureEnrollmentNotExpired(enrollment: { id: string; expiresAt: Date | null; status: any }) {
    if (enrollment.expiresAt && enrollment.expiresAt <= new Date()) {
      await this.prisma.academyEnrollment.update({ where: { id: enrollment.id }, data: { status: 'EXPIRED' } });
      throw new ForbiddenException('This course enrollment has expired.');
    }
  }

  private async refreshProgress(enrollmentId: string) {
    const enrollment = await this.prisma.academyEnrollment.findUniqueOrThrow({
      where: { id: enrollmentId },
      include: {
        course: {
          include: {
            weeks: {
              include: {
                sessions: {
                  include: {
                    contentBlocks: {
                      where: { isActive: true, status: 'PUBLISHED' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    const total = enrollment.course.weeks.flatMap((week) => week.sessions).flatMap((session) => session.contentBlocks).length;
    const completed = await this.prisma.academyContentBlockProgress.count({ where: { enrollmentId, completedAt: { not: null } } });
    const progressPercent = total ? Math.min(100, Math.round((completed / total) * 100)) : 0;
    const updated = await this.prisma.academyEnrollment.update({ where: { id: enrollmentId }, data: { progressPercent, status: enrollment.status === 'ENROLLED' ? 'IN_PROGRESS' : enrollment.status } });
    return this.enrollmentRecord(updated);
  }

  private enrollmentRecord(enrollment: { id: string; registrationId: string; enrolledAt: Date | null; expiresAt: Date | null }) {
    if (!enrollment.enrolledAt || !enrollment.expiresAt) throw new BadRequestException('Enrollment dates are missing.');
    return { id: enrollment.id, registrationId: enrollment.registrationId, enrolledAt: enrollment.enrolledAt, expiresAt: enrollment.expiresAt };
  }

  private async determineFee(userId: string, email: string, courseId: string) {
    return this.determineFeeWithClient(this.prisma, userId, email, courseId);
  }

  private async firstTimeApplicantFee() {
    const settings = await this.settings.getAcademyFeeSettings();
    return { category: AcademyRegistrationFeeCategory.FIRST_TIME, amount: settings.firstTimeRegistrationFee, currency: 'UGX' };
  }

  private async byuApplicantFee() {
    const settings = await this.settings.getAcademyFeeSettings();
    return { category: AcademyRegistrationFeeCategory.BYU_PATHWAY, amount: settings.byuPathwayFee, currency: 'UGX' };
  }

  private async determineFeeWithClient(client: Prisma.TransactionClient | PrismaService, userId: string, email: string, courseId: string) {
    const [failedAttempt, approvedByu, settings] = await Promise.all([
      client.academyEnrollment.findFirst({ where: { userId, courseId, status: 'FAILED' }, select: { id: true } }),
      client.byuPathwayVerification.findFirst({ where: { status: 'APPROVED', email, OR: [{ userId }, { userId: null }] }, select: { id: true } }),
      this.settings.getAcademyFeeSettings(),
    ]);
    if (failedAttempt) return { category: AcademyRegistrationFeeCategory.RE_ENROLLMENT, amount: settings.reEnrollmentFee, currency: 'UGX' };
    if (approvedByu) return { category: AcademyRegistrationFeeCategory.BYU_PATHWAY, amount: settings.byuPathwayFee, currency: 'UGX' };
    return { category: AcademyRegistrationFeeCategory.FIRST_TIME, amount: settings.firstTimeRegistrationFee, currency: 'UGX' };
  }

  private async ensureCourse(courseId: string) {
    const course = await this.prisma.academyCourse.findFirst({ where: { id: courseId, isActive: true } });
    if (!course) throw new NotFoundException('Academy course was not found or is unavailable.');
    return course;
  }

  private registrationRecord(registration: { id: string; status: any; feeCategory: AcademyRegistrationFeeCategory; feeAmount: Prisma.Decimal; currency: string; courseId: string; userId: string }) {
    return { id: registration.id, status: registration.status, courseId: registration.courseId, userId: registration.userId, fee: { category: registration.feeCategory, amount: Number(registration.feeAmount), currency: registration.currency } };
  }

  private applicantRecord(applicant: { id: string; email: string; courseId: string; emailVerifiedAt: Date | null; feeCategory: AcademyRegistrationFeeCategory; feeAmount: Prisma.Decimal; currency: string }) {
    return { id: applicant.id, email: applicant.email, courseId: applicant.courseId, emailVerifiedAt: applicant.emailVerifiedAt, fee: { category: applicant.feeCategory, amount: Number(applicant.feeAmount), currency: applicant.currency } };
  }

  private paymentRecord(payment: { id: string; reference: string; provider: PaymentProvider | null; providerStatus: any; amount: Prisma.Decimal; currency: string }, registrationId: string) {
    if (!payment.provider) throw new BadRequestException('Payment provider is missing.');
    return { id: payment.id, reference: payment.reference, provider: payment.provider, providerStatus: payment.providerStatus, amount: Number(payment.amount), currency: payment.currency, registrationId };
  }

  private applicantPaymentRecord(payment: { id: string; reference: string; provider: PaymentProvider | null; providerStatus: any; amount: Prisma.Decimal; currency: string }, applicantId: string | null) {
    if (!payment.provider) throw new BadRequestException('Payment provider is missing.');
    return { id: payment.id, reference: payment.reference, provider: payment.provider, providerStatus: payment.providerStatus, amount: Number(payment.amount), currency: payment.currency, registrationId: null, applicantId };
  }

  private byuRecord(item: any) {
    return { id: item.id, email: item.email, status: item.status, emailVerifiedAt: item.emailVerifiedAt, reviewedAt: item.reviewedAt, rejectionReason: item.rejectionReason, proofFileName: item.proofDocument?.fileName ?? null, proofPreviewUrl: item.proofDocument ? this.storage.previewUrl(item.proofDocument.storageKey) : null };
  }

  private dispatch(subjectId: string, email: string, code: string) {
    return { subjectId, email, developmentCode: null };
  }

  private normalizedEmail(value: string) { return value.trim().toLowerCase(); }
  private code() { return randomInt(100000, 1000000).toString(); }
  private token() { return randomBytes(48).toString('base64url'); }
  private hash(value: string) { return createHash('sha256').update(value).digest('hex'); }
  private hashesMatch(left: string, right: string) {
    return left.length === right.length && Buffer.from(left).equals(Buffer.from(right));
  }
  private afterMinutes(minutes: number) { return new Date(Date.now() + minutes * 60 * 1000); }
}
