import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { AcademyLifecycleService } from './academy-lifecycle.service';
import {
  AcademyEnrollmentRecord,
  AcademyFeeQuote,
  AcademyMobileMoneyPayment,
  AcademyRegistrationRecord,
  AcademyApplicantRecord,
  BeginAcademyLearnerAccountInput,
  BeginByuPathwayVerificationInput,
  ByuPathwayVerificationRecord,
  ByuProofSubmissionGrant,
  CompleteByuContinuationInput,
  ConfirmAcademyPaymentResult,
  EmailCodeDispatch,
  InitiateAcademyMobileMoneyPaymentInput,
  PublicAcademyCourse,
  ReviewByuPathwayVerificationInput,
  VerifyAcademyLearnerEmailInput,
  VerifyByuPathwayEmailInput,
  AcademyAssessmentRecord,
  AddAcademyAssessmentQuestionInput,
  AssessmentSubmissionResult,
  CreateAcademyAssessmentInput,
  LearnerAssessmentAttempt,
  LearnerAcademyAssessment,
  SubmitAcademyAssessmentInput,
  StartByuPathwayProofInput,
  ActivateAcademyApplicantInput,
} from './academy-lifecycle.types';

@Resolver()
export class AcademyLifecycleResolver {
  constructor(private readonly lifecycle: AcademyLifecycleService) {}

  @Query(() => [PublicAcademyCourse])
  publicAcademyCourses() { return this.lifecycle.listPublicCourses(); }

  @Query(() => [LearnerAcademyAssessment])
  @UseGuards(GqlAuthGuard)
  myAcademyAssessments(@CurrentUser() user: any, @Args('courseId', { type: () => ID }) courseId: string) {
    return this.lifecycle.listLearnerAssessments(user.id, courseId);
  }

  @Mutation(() => EmailCodeDispatch)
  beginAcademyLearnerAccount(@Args('input') input: BeginAcademyLearnerAccountInput) {
    return this.lifecycle.beginLearnerAccount(input);
  }

  @Mutation(() => AcademyApplicantRecord)
  verifyAcademyLearnerEmail(@Args('input') input: VerifyAcademyLearnerEmailInput) {
    return this.lifecycle.verifyLearnerAccount(input);
  }

  @Mutation(() => EmailCodeDispatch)
  beginByuPathwayVerification(@Args('input') input: BeginByuPathwayVerificationInput) {
    return this.lifecycle.beginByuVerification(input);
  }

  @Mutation(() => ByuProofSubmissionGrant)
  verifyByuPathwayEmail(@Args('input') input: VerifyByuPathwayEmailInput) {
    return this.lifecycle.verifyByuEmail(input);
  }

  @Mutation(() => ByuProofSubmissionGrant)
  startByuPathwayProof(@Args('input') input: StartByuPathwayProofInput) {
    return this.lifecycle.startByuProof(input);
  }

  @Query(() => [ByuPathwayVerificationRecord])
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @RequirePermissions('academy.byu.review')
  byuPathwayReviewQueue() { return this.lifecycle.listByuReviews(); }

  @Mutation(() => ByuPathwayVerificationRecord)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @RequirePermissions('academy.byu.review')
  reviewByuPathwayVerification(
    @CurrentUser() user: any,
    @Args('input') input: ReviewByuPathwayVerificationInput,
  ) { return this.lifecycle.reviewByuVerification(user.id, input); }

  @Mutation(() => AcademyApplicantRecord)
  completeByuPathwayContinuation(@Args('input') input: CompleteByuContinuationInput) {
    return this.lifecycle.completeByuContinuation(input);
  }

  @Query(() => AcademyFeeQuote)
  @UseGuards(GqlAuthGuard)
  academyRegistrationFeeQuote(@CurrentUser() user: any, @Args('courseId', { type: () => ID }) courseId: string) {
    return this.lifecycle.feeQuote(user, courseId);
  }

  @Mutation(() => AcademyRegistrationRecord)
  @UseGuards(GqlAuthGuard)
  startAcademyRegistration(@CurrentUser() user: any, @Args('courseId', { type: () => ID }) courseId: string) {
    return this.lifecycle.startRegistration(user, courseId);
  }

  @Mutation(() => AcademyMobileMoneyPayment)
  initiateAcademyMobileMoneyPayment(@Args('input') input: InitiateAcademyMobileMoneyPaymentInput) {
    return this.lifecycle.initiateMobileMoney(input);
  }

  @Mutation(() => ConfirmAcademyPaymentResult)
  confirmMockAcademyMobileMoneyPayment(@Args('paymentId', { type: () => ID }) paymentId: string) {
    return this.lifecycle.confirmMockMobileMoney(paymentId);
  }

  @Mutation(() => AcademyEnrollmentRecord)
  activateAcademyApplicant(@Args('input') input: ActivateAcademyApplicantInput) {
    return this.lifecycle.activateApplicant(input);
  }

  @Mutation(() => AcademyAssessmentRecord)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @RequirePermissions('academy.manage')
  createAcademyAssessment(@Args('input') input: CreateAcademyAssessmentInput) {
    return this.lifecycle.createAssessment(input);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @RequirePermissions('academy.manage')
  async addAcademyAssessmentQuestion(@Args('input') input: AddAcademyAssessmentQuestionInput) {
    const question = await this.lifecycle.addAssessmentQuestion(input);
    return question.id;
  }

  @Mutation(() => AcademyAssessmentRecord)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @RequirePermissions('academy.manage')
  publishAcademyAssessment(@Args('id', { type: () => ID }) id: string) {
    return this.lifecycle.publishAssessment(id);
  }

  @Mutation(() => AcademyEnrollmentRecord)
  @UseGuards(GqlAuthGuard)
  markAcademyContentBlockComplete(@CurrentUser() user: any, @Args('contentBlockId', { type: () => ID }) contentBlockId: string) {
    return this.lifecycle.markContentBlockComplete(user.id, contentBlockId);
  }

  @Mutation(() => LearnerAssessmentAttempt)
  @UseGuards(GqlAuthGuard)
  startAcademyAssessment(@CurrentUser() user: any, @Args('assessmentId', { type: () => ID }) assessmentId: string) {
    return this.lifecycle.startAssessment(user.id, assessmentId);
  }

  @Mutation(() => AssessmentSubmissionResult)
  @UseGuards(GqlAuthGuard)
  submitAcademyAssessment(@CurrentUser() user: any, @Args('input') input: SubmitAcademyAssessmentInput) {
    return this.lifecycle.submitAssessment(user.id, input);
  }
}
