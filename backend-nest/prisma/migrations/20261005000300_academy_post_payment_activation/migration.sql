CREATE TYPE "AcademyApplicantTokenPurpose" AS ENUM ('EMAIL_VERIFICATION', 'PAYMENT_ACTIVATION');

ALTER TABLE "AcademyApplicant" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "passwordHash" DROP NOT NULL;

ALTER TABLE "AcademyApplicantVerificationToken" ADD COLUMN "purpose" "AcademyApplicantTokenPurpose" NOT NULL DEFAULT 'EMAIL_VERIFICATION';
CREATE INDEX "AcademyApplicantVerificationToken_applicantId_purpose_expiresAt_idx" ON "AcademyApplicantVerificationToken"("applicantId", "purpose", "expiresAt");
