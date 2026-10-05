-- Keep applicants separate from User until payment confirmation creates the
-- portal account. This preserves a genuine no-portal-before-payment workflow.
CREATE TABLE "AcademyApplicant" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "courseId" UUID NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "feeCategory" "AcademyRegistrationFeeCategory" NOT NULL DEFAULT 'FIRST_TIME',
    "feeAmount" DECIMAL(14,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'UGX',
    "byuPathwayVerificationId" UUID,
    "paymentId" UUID,
    "createdUserId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "AcademyApplicant_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AcademyApplicantVerificationToken" (
    "id" UUID NOT NULL,
    "applicantId" UUID NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AcademyApplicantVerificationToken_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AcademyApplicant_byuPathwayVerificationId_key" ON "AcademyApplicant"("byuPathwayVerificationId");
CREATE UNIQUE INDEX "AcademyApplicant_paymentId_key" ON "AcademyApplicant"("paymentId");
CREATE UNIQUE INDEX "AcademyApplicant_createdUserId_key" ON "AcademyApplicant"("createdUserId");
CREATE INDEX "AcademyApplicant_email_courseId_idx" ON "AcademyApplicant"("email", "courseId");
CREATE INDEX "AcademyApplicant_courseId_emailVerifiedAt_idx" ON "AcademyApplicant"("courseId", "emailVerifiedAt");
CREATE UNIQUE INDEX "AcademyApplicantVerificationToken_tokenHash_key" ON "AcademyApplicantVerificationToken"("tokenHash");
CREATE INDEX "AcademyApplicantVerificationToken_applicantId_expiresAt_idx" ON "AcademyApplicantVerificationToken"("applicantId", "expiresAt");

ALTER TABLE "AcademyApplicant" ADD CONSTRAINT "AcademyApplicant_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "AcademyCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AcademyApplicant" ADD CONSTRAINT "AcademyApplicant_byuPathwayVerificationId_fkey" FOREIGN KEY ("byuPathwayVerificationId") REFERENCES "ByuPathwayVerification"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AcademyApplicant" ADD CONSTRAINT "AcademyApplicant_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AcademyApplicant" ADD CONSTRAINT "AcademyApplicant_createdUserId_fkey" FOREIGN KEY ("createdUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AcademyApplicantVerificationToken" ADD CONSTRAINT "AcademyApplicantVerificationToken_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "AcademyApplicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
