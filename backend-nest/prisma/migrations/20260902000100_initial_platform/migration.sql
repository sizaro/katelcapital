-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'ACTIVE', 'DISABLED');

-- CreateEnum
CREATE TYPE "PermissionEffect" AS ENUM ('GRANT', 'DENY');

-- CreateEnum
CREATE TYPE "ProfessionalStatus" AS ENUM ('ACADEMY_REQUIRED', 'ACADEMY_IN_PROGRESS', 'ACADEMY_COMPLETED', 'PROFILE_INCOMPLETE', 'PROFILE_COMPLETE', 'ASSESSMENT_PENDING', 'ASSESSED', 'VETTING_PENDING', 'VETTED', 'KATEL_READY', 'AVAILABLE', 'INTERVIEWING', 'SELECTED', 'ONBOARDING', 'DEPLOYED');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('NEW', 'UNDER_REVIEW', 'CLARIFICATION_REQUIRED', 'MATCHING_IN_PROGRESS', 'CANDIDATES_READY', 'INTERVIEWS_IN_PROGRESS', 'CANDIDATE_SELECTED', 'ONBOARDING', 'ACTIVE_ENGAGEMENT', 'CLOSED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('APPLIED', 'ENROLLED', 'IN_PROGRESS', 'COMPLETED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "WorkflowStatus" AS ENUM ('DRAFT', 'OPEN', 'IN_PROGRESS', 'COMPLETED', 'APPROVED', 'REJECTED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "roleId" UUID NOT NULL,
    "permissionId" UUID NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "UserPermissionOverride" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "permissionId" UUID NOT NULL,
    "effect" "PermissionEffect" NOT NULL,
    "reason" TEXT,

    CONSTRAINT "UserPermissionOverride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
    "emailVerifiedAt" TIMESTAMP(3),
    "roleId" UUID NOT NULL,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshSession" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailVerificationToken" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "EmailVerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginHistory" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "email" TEXT NOT NULL,
    "succeeded" BOOLEAN NOT NULL,
    "reason" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyCourse" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AcademyCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyEnrollment" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "courseId" UUID NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'APPLIED',
    "enrolledAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "progressPercent" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AcademyEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyResult" (
    "id" UUID NOT NULL,
    "enrollmentId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "score" DECIMAL(6,2),
    "maximumScore" DECIMAL(6,2),

    CONSTRAINT "AcademyResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyCompletion" (
    "id" UUID NOT NULL,
    "completionCode" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "courseId" UUID NOT NULL,
    "enrollmentId" UUID NOT NULL,
    "completionDate" TIMESTAMP(3) NOT NULL,
    "finalScore" DECIMAL(6,2),
    "status" "WorkflowStatus" NOT NULL DEFAULT 'COMPLETED',
    "certificateStorageKey" TEXT,

    CONSTRAINT "AcademyCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalCategory" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProfessionalCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalProfile" (
    "id" UUID NOT NULL,
    "professionalCode" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "categoryId" UUID,
    "summary" TEXT,
    "location" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'Africa/Kampala',
    "linkedinUrl" TEXT,
    "portfolioUrl" TEXT,
    "cvStorageKey" TEXT,
    "completionPercent" INTEGER NOT NULL DEFAULT 0,
    "status" "ProfessionalStatus" NOT NULL DEFAULT 'PROFILE_INCOMPLETE',

    CONSTRAINT "ProfessionalProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalEducation" (
    "id" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "institution" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "field" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),

    CONSTRAINT "ProfessionalEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalExperience" (
    "id" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "organization" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT,

    CONSTRAINT "ProfessionalExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalSkill" (
    "professionalId" UUID NOT NULL,
    "skillId" UUID NOT NULL,
    "proficiency" TEXT,
    "yearsExperience" INTEGER,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProfessionalSkill_pkey" PRIMARY KEY ("professionalId","skillId")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalLanguage" (
    "professionalId" UUID NOT NULL,
    "languageId" UUID NOT NULL,
    "proficiency" TEXT NOT NULL,

    CONSTRAINT "ProfessionalLanguage_pkey" PRIMARY KEY ("professionalId","languageId")
);

-- CreateTable
CREATE TABLE "ProfessionalCertification" (
    "id" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "issuer" TEXT,
    "issuedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "ProfessionalCertification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalStatusHistory" (
    "id" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "fromStatus" "ProfessionalStatus",
    "toStatus" "ProfessionalStatus" NOT NULL,
    "actorId" UUID,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfessionalStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentDefinition" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AssessmentDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentCriterion" (
    "id" UUID NOT NULL,
    "definitionId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "weight" DECIMAL(5,2) NOT NULL DEFAULT 1,
    "visibleToProfessional" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AssessmentCriterion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalAssessment" (
    "id" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "definitionId" UUID NOT NULL,
    "assessorId" UUID,
    "status" "WorkflowStatus" NOT NULL DEFAULT 'DRAFT',
    "totalScore" DECIMAL(6,2),
    "recommendation" TEXT,
    "comments" TEXT,

    CONSTRAINT "ProfessionalAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentScore" (
    "assessmentId" UUID NOT NULL,
    "criterionId" UUID NOT NULL,
    "score" DECIMAL(6,2) NOT NULL,
    "comments" TEXT,
    "visibleToProfessional" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AssessmentScore_pkey" PRIMARY KEY ("assessmentId","criterionId")
);

-- CreateTable
CREATE TABLE "VettingCase" (
    "id" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "officerId" UUID,
    "approverId" UUID,
    "status" "WorkflowStatus" NOT NULL DEFAULT 'OPEN',
    "recommendation" TEXT,
    "decision" TEXT,
    "comments" TEXT,
    "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "VettingCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadinessApproval" (
    "id" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "approverId" UUID NOT NULL,
    "rulesVersion" TEXT,
    "comments" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "approvedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "ReadinessApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientOrganization" (
    "id" UUID NOT NULL,
    "organizationCode" TEXT NOT NULL,
    "legalName" TEXT NOT NULL,
    "industry" TEXT,
    "country" TEXT,
    "address" TEXT,
    "website" TEXT,
    "status" "WorkflowStatus" NOT NULL DEFAULT 'OPEN',
    "assignedManagerId" UUID,

    CONSTRAINT "ClientOrganization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientContact" (
    "id" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "primary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ClientContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationUser" (
    "organizationId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT,

    CONSTRAINT "OrganizationUser_pkey" PRIMARY KEY ("organizationId","userId")
);

-- CreateTable
CREATE TABLE "TalentRequest" (
    "id" UUID NOT NULL,
    "requestCode" TEXT NOT NULL,
    "organizationId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "location" TEXT,
    "headcount" INTEGER NOT NULL DEFAULT 1,
    "status" "RequestStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TalentRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalentRequestSkill" (
    "requestId" UUID NOT NULL,
    "skillId" UUID NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "weight" DECIMAL(5,2) NOT NULL DEFAULT 1,

    CONSTRAINT "TalentRequestSkill_pkey" PRIMARY KEY ("requestId","skillId")
);

-- CreateTable
CREATE TABLE "TalentRequestStatusHistory" (
    "id" UUID NOT NULL,
    "requestId" UUID NOT NULL,
    "fromStatus" "RequestStatus",
    "toStatus" "RequestStatus" NOT NULL,
    "actorId" UUID,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TalentRequestStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchCandidate" (
    "id" UUID NOT NULL,
    "requestId" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "score" DECIMAL(6,2) NOT NULL,
    "scoreBreakdown" JSONB,
    "status" "WorkflowStatus" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "MatchCandidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" UUID NOT NULL,
    "requestId" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "status" "WorkflowStatus" NOT NULL DEFAULT 'OPEN',
    "scheduledAt" TIMESTAMP(3),
    "meetingUrl" TEXT,
    "feedback" JSONB,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Engagement" (
    "id" UUID NOT NULL,
    "engagementCode" TEXT NOT NULL,
    "requestId" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "status" "WorkflowStatus" NOT NULL DEFAULT 'OPEN',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "Engagement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportCase" (
    "id" UUID NOT NULL,
    "engagementId" UUID NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "WorkflowStatus" NOT NULL DEFAULT 'OPEN',
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',

    CONSTRAINT "SupportCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" UUID NOT NULL,
    "subject" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" UUID NOT NULL,
    "conversationId" UUID NOT NULL,
    "senderId" UUID NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "link" TEXT,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" UUID NOT NULL,
    "ownerId" UUID NOT NULL,
    "storageKey" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sensitivity" TEXT NOT NULL DEFAULT 'STANDARD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "reference" TEXT NOT NULL,
    "amount" DECIMAL(14,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'UGX',
    "purpose" TEXT NOT NULL,
    "status" "WorkflowStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" UUID NOT NULL,
    "actorId" UUID,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemSetting" (
    "id" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_key_key" ON "Permission"("key");

-- CreateIndex
CREATE UNIQUE INDEX "UserPermissionOverride_userId_permissionId_key" ON "UserPermissionOverride"("userId", "permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_roleId_status_idx" ON "User"("roleId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshSession_tokenHash_key" ON "RefreshSession"("tokenHash");

-- CreateIndex
CREATE INDEX "RefreshSession_userId_expiresAt_idx" ON "RefreshSession"("userId", "expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationToken_tokenHash_key" ON "EmailVerificationToken"("tokenHash");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_tokenHash_key" ON "PasswordResetToken"("tokenHash");

-- CreateIndex
CREATE INDEX "LoginHistory_email_createdAt_idx" ON "LoginHistory"("email", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyCourse_code_key" ON "AcademyCourse"("code");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyEnrollment_userId_courseId_key" ON "AcademyEnrollment"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyCompletion_completionCode_key" ON "AcademyCompletion"("completionCode");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyCompletion_enrollmentId_key" ON "AcademyCompletion"("enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalCategory_name_key" ON "ProfessionalCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalProfile_professionalCode_key" ON "ProfessionalProfile"("professionalCode");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalProfile_userId_key" ON "ProfessionalProfile"("userId");

-- CreateIndex
CREATE INDEX "ProfessionalProfile_status_categoryId_idx" ON "ProfessionalProfile"("status", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE INDEX "ProfessionalStatusHistory_professionalId_createdAt_idx" ON "ProfessionalStatusHistory"("professionalId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentDefinition_name_key" ON "AssessmentDefinition"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentCriterion_definitionId_name_key" ON "AssessmentCriterion"("definitionId", "name");

-- CreateIndex
CREATE INDEX "ReadinessApproval_professionalId_active_idx" ON "ReadinessApproval"("professionalId", "active");

-- CreateIndex
CREATE UNIQUE INDEX "ClientOrganization_organizationCode_key" ON "ClientOrganization"("organizationCode");

-- CreateIndex
CREATE UNIQUE INDEX "TalentRequest_requestCode_key" ON "TalentRequest"("requestCode");

-- CreateIndex
CREATE INDEX "TalentRequest_organizationId_status_idx" ON "TalentRequest"("organizationId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "MatchCandidate_requestId_professionalId_key" ON "MatchCandidate"("requestId", "professionalId");

-- CreateIndex
CREATE UNIQUE INDEX "Engagement_engagementCode_key" ON "Engagement"("engagementCode");

-- CreateIndex
CREATE INDEX "Notification_userId_readAt_idx" ON "Notification"("userId", "readAt");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_reference_key" ON "Payment"("reference");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_createdAt_idx" ON "AuditLog"("entityType", "entityId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "SystemSetting_key_key" ON "SystemSetting"("key");

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermissionOverride" ADD CONSTRAINT "UserPermissionOverride_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermissionOverride" ADD CONSTRAINT "UserPermissionOverride_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshSession" ADD CONSTRAINT "RefreshSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailVerificationToken" ADD CONSTRAINT "EmailVerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginHistory" ADD CONSTRAINT "LoginHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyEnrollment" ADD CONSTRAINT "AcademyEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyEnrollment" ADD CONSTRAINT "AcademyEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "AcademyCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyResult" ADD CONSTRAINT "AcademyResult_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "AcademyEnrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyCompletion" ADD CONSTRAINT "AcademyCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyCompletion" ADD CONSTRAINT "AcademyCompletion_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "AcademyCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyCompletion" ADD CONSTRAINT "AcademyCompletion_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "AcademyEnrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalProfile" ADD CONSTRAINT "ProfessionalProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalProfile" ADD CONSTRAINT "ProfessionalProfile_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProfessionalCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalEducation" ADD CONSTRAINT "ProfessionalEducation_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "ProfessionalProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalExperience" ADD CONSTRAINT "ProfessionalExperience_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "ProfessionalProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalSkill" ADD CONSTRAINT "ProfessionalSkill_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "ProfessionalProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalSkill" ADD CONSTRAINT "ProfessionalSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalLanguage" ADD CONSTRAINT "ProfessionalLanguage_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "ProfessionalProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalLanguage" ADD CONSTRAINT "ProfessionalLanguage_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalCertification" ADD CONSTRAINT "ProfessionalCertification_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "ProfessionalProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalStatusHistory" ADD CONSTRAINT "ProfessionalStatusHistory_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "ProfessionalProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentCriterion" ADD CONSTRAINT "AssessmentCriterion_definitionId_fkey" FOREIGN KEY ("definitionId") REFERENCES "AssessmentDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalAssessment" ADD CONSTRAINT "ProfessionalAssessment_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "ProfessionalProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalAssessment" ADD CONSTRAINT "ProfessionalAssessment_definitionId_fkey" FOREIGN KEY ("definitionId") REFERENCES "AssessmentDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentScore" ADD CONSTRAINT "AssessmentScore_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "ProfessionalAssessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentScore" ADD CONSTRAINT "AssessmentScore_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "AssessmentCriterion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VettingCase" ADD CONSTRAINT "VettingCase_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "ProfessionalProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadinessApproval" ADD CONSTRAINT "ReadinessApproval_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "ProfessionalProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientContact" ADD CONSTRAINT "ClientContact_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "ClientOrganization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUser" ADD CONSTRAINT "OrganizationUser_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "ClientOrganization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUser" ADD CONSTRAINT "OrganizationUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentRequest" ADD CONSTRAINT "TalentRequest_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "ClientOrganization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentRequestSkill" ADD CONSTRAINT "TalentRequestSkill_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "TalentRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentRequestSkill" ADD CONSTRAINT "TalentRequestSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentRequestStatusHistory" ADD CONSTRAINT "TalentRequestStatusHistory_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "TalentRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchCandidate" ADD CONSTRAINT "MatchCandidate_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "TalentRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchCandidate" ADD CONSTRAINT "MatchCandidate_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "ProfessionalProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "TalentRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "ProfessionalProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "TalentRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "ClientOrganization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Engagement" ADD CONSTRAINT "Engagement_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "ProfessionalProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportCase" ADD CONSTRAINT "SupportCase_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "Engagement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
