-- Generated from a verified datasource-to-schema diff. Prisma's create-only
-- command cannot run non-interactively in this environment.

CREATE TYPE "PaymentProvider" AS ENUM ('MTN_MOMO', 'AIRTEL_MONEY');
CREATE TYPE "PaymentProviderStatus" AS ENUM ('INITIATED', 'PENDING', 'CONFIRMED', 'FAILED', 'CANCELLED', 'EXPIRED');
CREATE TYPE "AcademyRegistrationFeeCategory" AS ENUM ('FIRST_TIME', 'BYU_PATHWAY', 'RE_ENROLLMENT');
CREATE TYPE "ByuPathwayVerificationStatus" AS ENUM ('EMAIL_PENDING', 'EMAIL_VERIFIED', 'PROOF_SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'EXPIRED');
CREATE TYPE "ByuPathwayTokenPurpose" AS ENUM ('EMAIL_VERIFICATION', 'PROOF_SUBMISSION', 'REGISTRATION_CONTINUATION');

ALTER TABLE "Document" DROP CONSTRAINT "Document_ownerId_fkey";

ALTER TABLE "AcademyRegistration" ADD COLUMN "currency" TEXT NOT NULL DEFAULT 'UGX',
ADD COLUMN "feeAmount" DECIMAL(14,2) NOT NULL,
ADD COLUMN "feeCategory" "AcademyRegistrationFeeCategory" NOT NULL DEFAULT 'FIRST_TIME';

ALTER TABLE "Document" ALTER COLUMN "ownerId" DROP NOT NULL;

ALTER TABLE "Payment" ADD COLUMN "confirmationPayload" JSONB,
ADD COLUMN "confirmedAt" TIMESTAMP(3),
ADD COLUMN "failedAt" TIMESTAMP(3),
ADD COLUMN "failureReason" TEXT,
ADD COLUMN "payerPhone" TEXT,
ADD COLUMN "provider" "PaymentProvider",
ADD COLUMN "providerReference" TEXT,
ADD COLUMN "providerStatus" "PaymentProviderStatus" NOT NULL DEFAULT 'INITIATED';

CREATE TABLE "ByuPathwayVerification" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "userId" UUID,
    "proofDocumentId" UUID,
    "status" "ByuPathwayVerificationStatus" NOT NULL DEFAULT 'EMAIL_PENDING',
    "reviewedById" UUID,
    "reviewedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "reviewNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ByuPathwayVerification_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ByuPathwayVerificationToken" (
    "id" UUID NOT NULL,
    "verificationId" UUID NOT NULL,
    "purpose" "ByuPathwayTokenPurpose" NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ByuPathwayVerificationToken_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ByuPathwayVerification_proofDocumentId_key" ON "ByuPathwayVerification"("proofDocumentId");
CREATE INDEX "ByuPathwayVerification_email_status_idx" ON "ByuPathwayVerification"("email", "status");
CREATE INDEX "ByuPathwayVerification_userId_status_idx" ON "ByuPathwayVerification"("userId", "status");
CREATE INDEX "ByuPathwayVerification_reviewedById_status_idx" ON "ByuPathwayVerification"("reviewedById", "status");
CREATE UNIQUE INDEX "ByuPathwayVerificationToken_tokenHash_key" ON "ByuPathwayVerificationToken"("tokenHash");
CREATE INDEX "ByuPathwayVerificationToken_verificationId_purpose_expiresA_idx" ON "ByuPathwayVerificationToken"("verificationId", "purpose", "expiresAt");
CREATE UNIQUE INDEX "Payment_providerReference_key" ON "Payment"("providerReference");
CREATE INDEX "Payment_userId_providerStatus_idx" ON "Payment"("userId", "providerStatus");

ALTER TABLE "ByuPathwayVerification" ADD CONSTRAINT "ByuPathwayVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ByuPathwayVerification" ADD CONSTRAINT "ByuPathwayVerification_proofDocumentId_fkey" FOREIGN KEY ("proofDocumentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ByuPathwayVerification" ADD CONSTRAINT "ByuPathwayVerification_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ByuPathwayVerificationToken" ADD CONSTRAINT "ByuPathwayVerificationToken_verificationId_fkey" FOREIGN KEY ("verificationId") REFERENCES "ByuPathwayVerification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Document" ADD CONSTRAINT "Document_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
