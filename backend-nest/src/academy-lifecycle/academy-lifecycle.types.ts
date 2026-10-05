import { Field, Float, ID, InputType, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEmail, IsEnum, IsInt, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import {
  AcademyRegistrationFeeCategory,
  ByuPathwayVerificationStatus,
  PaymentProvider,
  PaymentProviderStatus,
  WorkflowStatus,
  AcademyAssessmentType,
  AcademyQuestionType,
  AcademyAssessmentAttemptStatus,
  AcademyContentStatus,
} from '../../generated/prisma/client';

registerEnumType(AcademyRegistrationFeeCategory, { name: 'AcademyRegistrationFeeCategory' });
registerEnumType(ByuPathwayVerificationStatus, { name: 'ByuPathwayVerificationStatus' });
registerEnumType(PaymentProvider, { name: 'PaymentProvider' });
registerEnumType(PaymentProviderStatus, { name: 'PaymentProviderStatus' });
registerEnumType(WorkflowStatus, { name: 'WorkflowStatus' });
registerEnumType(AcademyAssessmentType, { name: 'AcademyAssessmentType' });
registerEnumType(AcademyQuestionType, { name: 'AcademyQuestionType' });
registerEnumType(AcademyAssessmentAttemptStatus, { name: 'AcademyAssessmentAttemptStatus' });
registerEnumType(AcademyContentStatus, { name: 'AcademyContentStatus' });

@ObjectType()
export class PublicAcademyCourse {
  @Field(() => ID) id!: string;
  @Field() code!: string;
  @Field() title!: string;
  @Field(() => String, { nullable: true }) description?: string | null;
  @Field(() => Int) durationWeeks!: number;
}

@ObjectType()
export class AcademyFeeQuote {
  @Field(() => AcademyRegistrationFeeCategory) category!: AcademyRegistrationFeeCategory;
  @Field(() => Int) amount!: number;
  @Field() currency!: string;
}

@ObjectType()
export class AcademyRegistrationRecord {
  @Field(() => ID) id!: string;
  @Field(() => WorkflowStatus) status!: WorkflowStatus;
  @Field(() => AcademyFeeQuote) fee!: AcademyFeeQuote;
  @Field(() => ID) courseId!: string;
  @Field(() => ID) userId!: string;
}

@ObjectType()
export class AcademyApplicantRecord {
  @Field(() => ID) id!: string;
  @Field() email!: string;
  @Field(() => ID) courseId!: string;
  @Field(() => Date, { nullable: true }) emailVerifiedAt?: Date | null;
  @Field(() => AcademyFeeQuote) fee!: AcademyFeeQuote;
}

@ObjectType()
export class EmailCodeDispatch {
  @Field(() => ID) subjectId!: string;
  @Field() email!: string;
  @Field(() => String, { nullable: true }) developmentCode?: string | null;
}

@ObjectType()
export class ByuProofSubmissionGrant {
  @Field(() => ID) verificationId!: string;
  @Field() submissionToken!: string;
  @Field() expiresAt!: Date;
}

@ObjectType()
export class ByuPathwayVerificationRecord {
  @Field(() => ID) id!: string;
  @Field() email!: string;
  @Field(() => ByuPathwayVerificationStatus) status!: ByuPathwayVerificationStatus;
  @Field(() => Date, { nullable: true }) emailVerifiedAt?: Date | null;
  @Field(() => Date, { nullable: true }) reviewedAt?: Date | null;
  @Field(() => String, { nullable: true }) rejectionReason?: string | null;
  @Field(() => String, { nullable: true }) proofFileName?: string | null;
  @Field(() => String, { nullable: true }) proofPreviewUrl?: string | null;
}

@ObjectType()
export class AcademyMobileMoneyPayment {
  @Field(() => ID) id!: string;
  @Field() reference!: string;
  @Field(() => PaymentProvider) provider!: PaymentProvider;
  @Field(() => PaymentProviderStatus) providerStatus!: PaymentProviderStatus;
  @Field(() => Int) amount!: number;
  @Field() currency!: string;
  @Field(() => ID, { nullable: true }) registrationId?: string | null;
  @Field(() => ID, { nullable: true }) applicantId?: string | null;
}

@ObjectType()
export class AcademyEnrollmentRecord {
  @Field(() => ID) id!: string;
  @Field(() => ID) registrationId!: string;
  @Field(() => Date) enrolledAt!: Date;
  @Field(() => Date) expiresAt!: Date;
}

@ObjectType()
export class ConfirmAcademyPaymentResult {
  @Field(() => AcademyMobileMoneyPayment) payment!: AcademyMobileMoneyPayment;
  @Field(() => AcademyEnrollmentRecord, { nullable: true }) enrollment?: AcademyEnrollmentRecord | null;
  @Field() activationEmailSent!: boolean;
}

@ObjectType()
export class LearnerAssessmentOption {
  @Field(() => ID) id!: string;
  @Field() text!: string;
  @Field(() => Int) order!: number;
}

@ObjectType()
export class LearnerAssessmentQuestion {
  @Field(() => ID) id!: string;
  @Field() prompt!: string;
  @Field(() => AcademyQuestionType) type!: AcademyQuestionType;
  @Field(() => Int) points!: number;
  @Field(() => [LearnerAssessmentOption]) options!: LearnerAssessmentOption[];
}

@ObjectType()
export class LearnerAssessmentAttempt {
  @Field(() => ID) id!: string;
  @Field(() => ID) assessmentId!: string;
  @Field(() => AcademyAssessmentType) assessmentType!: AcademyAssessmentType;
  @Field() title!: string;
  @Field(() => AcademyAssessmentAttemptStatus) status!: AcademyAssessmentAttemptStatus;
  @Field(() => [LearnerAssessmentQuestion]) questions!: LearnerAssessmentQuestion[];
}

@ObjectType()
export class AcademyAssessmentRecord {
  @Field(() => ID) id!: string;
  @Field(() => ID) courseId!: string;
  @Field(() => ID, { nullable: true }) sessionId?: string | null;
  @Field(() => AcademyAssessmentType) type!: AcademyAssessmentType;
  @Field() title!: string;
  @Field(() => Float, { nullable: true }) maximumScore?: number | null;
  @Field(() => Float, { nullable: true }) passingScore?: number | null;
  @Field(() => AcademyContentStatus) status!: AcademyContentStatus;
}

@ObjectType()
export class LearnerAcademyAssessment {
  @Field(() => ID) id!: string;
  @Field(() => AcademyAssessmentType) type!: AcademyAssessmentType;
  @Field() title!: string;
  @Field(() => String, { nullable: true }) description?: string | null;
  @Field(() => Float, { nullable: true }) passingScore?: number | null;
}

@ObjectType()
export class AssessmentSubmissionResult {
  @Field(() => Boolean) passed!: boolean;
  @Field(() => Float) percentage!: number;
  @Field(() => AcademyEnrollmentRecord) enrollment!: AcademyEnrollmentRecord;
}

@InputType()
export class BeginAcademyLearnerAccountInput {
  @Field(() => ID) @IsString() courseId!: string;
  @Field() @IsEmail() @MaxLength(254) email!: string;
}

@InputType()
export class VerifyAcademyLearnerEmailInput {
  @Field(() => ID) @IsString() applicantId!: string;
  @Field() @IsString() @MinLength(6) @MaxLength(6) code!: string;
}

@InputType()
export class BeginByuPathwayVerificationInput {
  @Field() @IsEmail() @MaxLength(254) email!: string;
}

@InputType()
export class VerifyByuPathwayEmailInput {
  @Field(() => ID) verificationId!: string;
  @Field() @IsString() @MinLength(6) @MaxLength(6) code!: string;
}

@InputType()
export class ReviewByuPathwayVerificationInput {
  @Field(() => ID) verificationId!: string;
  @Field() approved!: boolean;
  @Field(() => String, { nullable: true }) @IsOptional() @IsString() @MaxLength(1000) rejectionReason?: string;
  @Field(() => String, { nullable: true }) @IsOptional() @IsString() @MaxLength(2000) reviewNote?: string;
}

@InputType()
export class CompleteByuContinuationInput {
  @Field() @IsString() continuationToken!: string;
}

@InputType()
export class InitiateAcademyMobileMoneyPaymentInput {
  @Field(() => ID) @IsString() applicantId!: string;
  @Field(() => PaymentProvider) @IsEnum(PaymentProvider) provider!: PaymentProvider;
  @Field() @IsString() @MinLength(10) @MaxLength(20) phone!: string;
}

@InputType()
export class StartByuPathwayProofInput {
  @Field(() => ID) @IsString() applicantId!: string;
}

@InputType()
export class ActivateAcademyApplicantInput {
  @Field() @IsString() token!: string;
  @Field() @IsString() @MaxLength(100) firstName!: string;
  @Field() @IsString() @MaxLength(100) lastName!: string;
  @Field() @IsString() @MinLength(12) @MaxLength(200) password!: string;
}

@InputType()
export class CreateAcademyAssessmentInput {
  @Field(() => ID) @IsString() courseId!: string;
  @Field(() => ID, { nullable: true }) @IsOptional() @IsString() sessionId?: string;
  @Field(() => AcademyAssessmentType) @IsEnum(AcademyAssessmentType) type!: AcademyAssessmentType;
  @Field() @IsString() @MaxLength(200) title!: string;
  @Field(() => String, { nullable: true }) @IsOptional() @IsString() @MaxLength(4000) description?: string;
  @Field(() => Float, { nullable: true }) @IsOptional() @IsNumber() @Min(0.01) maximumScore?: number;
  @Field(() => Float, { nullable: true }) @IsOptional() @IsNumber() @Min(0) passingScore?: number;
}

@InputType()
export class AddAcademyAssessmentQuestionInput {
  @Field(() => ID) @IsString() assessmentId!: string;
  @Field() @IsString() @MaxLength(4000) prompt!: string;
  @Field(() => AcademyQuestionType) @IsEnum(AcademyQuestionType) type!: AcademyQuestionType;
  @Field(() => Int) @IsInt() @Min(1) points!: number;
  @Field(() => [String]) @IsArray() @ArrayMinSize(2) options!: string[];
  @Field(() => [Int]) @IsArray() @ArrayMinSize(1) correctOptionIndexes!: number[];
}

@InputType()
export class LearnerAnswerInput {
  @Field(() => ID) @IsString() questionId!: string;
  @Field(() => [ID]) @IsArray() optionIds!: string[];
}

@InputType()
export class SubmitAcademyAssessmentInput {
  @Field(() => ID) @IsString() attemptId!: string;
  @Field(() => [LearnerAnswerInput]) @IsArray() @ValidateNested({ each: true }) @Type(() => LearnerAnswerInput) answers!: LearnerAnswerInput[];
}
