import { gql } from "@apollo/client";

export const PUBLIC_ACADEMY_COURSES = gql`
  query PublicAcademyCourses { publicAcademyCourses { id code title description durationWeeks } }
`;

export const BEGIN_LEARNER_ACCOUNT = gql`
  mutation BeginLearnerAccount($input: BeginAcademyLearnerAccountInput!) {
    beginAcademyLearnerAccount(input: $input) { subjectId email developmentCode }
  }
`;

export const VERIFY_LEARNER_EMAIL = gql`
  mutation VerifyLearnerEmail($input: VerifyAcademyLearnerEmailInput!) {
    verifyAcademyLearnerEmail(input: $input) { id email courseId emailVerifiedAt fee { category amount currency } }
  }
`;

export const START_REGISTRATION = gql`
  mutation StartAcademyRegistration($courseId: ID!) {
    startAcademyRegistration(courseId: $courseId) {
      id status courseId fee { category amount currency }
    }
  }
`;

export const INITIATE_MOBILE_MONEY = gql`
  mutation InitiateAcademyMobileMoney($input: InitiateAcademyMobileMoneyPaymentInput!) {
    initiateAcademyMobileMoneyPayment(input: $input) {
      id reference provider providerStatus amount currency applicantId
    }
  }
`;

export const CONFIRM_MOCK_PAYMENT = gql`
  mutation ConfirmMockPayment($paymentId: ID!) {
    confirmMockAcademyMobileMoneyPayment(paymentId: $paymentId) {
      payment { id reference provider providerStatus amount currency applicantId }
      enrollment { id registrationId enrolledAt expiresAt }
      activationEmailSent
    }
  }
`;

export const BEGIN_BYU = gql`
  mutation BeginByu($input: BeginByuPathwayVerificationInput!) {
    beginByuPathwayVerification(input: $input) { subjectId email developmentCode }
  }
`;

export const VERIFY_BYU = gql`
  mutation VerifyByu($input: VerifyByuPathwayEmailInput!) {
    verifyByuPathwayEmail(input: $input) { verificationId submissionToken expiresAt }
  }
`;

export const START_BYU_PROOF = gql`
  mutation StartByuProof($input: StartByuPathwayProofInput!) {
    startByuPathwayProof(input: $input) { verificationId submissionToken expiresAt }
  }
`;

export const COMPLETE_BYU = gql`
  mutation CompleteByu($input: CompleteByuContinuationInput!) {
    completeByuPathwayContinuation(input: $input) { id email courseId emailVerifiedAt fee { category amount currency } }
  }
`;

export const ACTIVATE_ACADEMY_APPLICANT = gql`
  mutation ActivateAcademyApplicant($input: ActivateAcademyApplicantInput!) {
    activateAcademyApplicant(input: $input) { id registrationId enrolledAt expiresAt }
  }
`;

export function academyError(error, fallback = "Something went wrong. Please try again.") {
  return error?.graphQLErrors?.[0]?.message || error?.message || fallback;
}

export const money = (amount, currency = "UGX") =>
  new Intl.NumberFormat("en-UG", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount || 0);
