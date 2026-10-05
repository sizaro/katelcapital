-- ============================================================
-- Rebuild Academy workflow
--
-- Production currently contains the original Academy tables,
-- but all Academy tables are empty.
--
-- This migration therefore drops only the old Academy tables
-- and recreates the complete Academy schema.
--
-- Non-Academy tables are not dropped or modified.
-- ============================================================


-- ============================================================
-- 1. Drop the old empty Academy tables
--
-- Drop children first so their foreign keys do not interfere.
-- ============================================================

DROP TABLE IF EXISTS "AcademyCompletion" CASCADE;
DROP TABLE IF EXISTS "AcademyResult" CASCADE;
DROP TABLE IF EXISTS "AcademyLessonProgress" CASCADE;
DROP TABLE IF EXISTS "AcademyEnrollment" CASCADE;
DROP TABLE IF EXISTS "AcademyAssessment" CASCADE;
DROP TABLE IF EXISTS "AcademyLesson" CASCADE;
DROP TABLE IF EXISTS "AcademyRegistration" CASCADE;
DROP TABLE IF EXISTS "AcademyModule" CASCADE;
DROP TABLE IF EXISTS "AcademyCourse" CASCADE;


-- ============================================================
-- 2. AcademyCourse
-- ============================================================

CREATE TABLE "AcademyCourse" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademyCourse_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AcademyCourse_code_key"
    ON "AcademyCourse"("code");


-- ============================================================
-- 3. AcademyModule
-- ============================================================

CREATE TABLE "AcademyModule" (
    "id" UUID NOT NULL,
    "courseId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AcademyModule_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AcademyModule_courseId_isActive_order_idx"
    ON "AcademyModule"("courseId", "isActive", "order");

CREATE UNIQUE INDEX "AcademyModule_courseId_order_key"
    ON "AcademyModule"("courseId", "order");


-- ============================================================
-- 4. AcademyLesson
-- ============================================================

CREATE TABLE "AcademyLesson" (
    "id" UUID NOT NULL,
    "moduleId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AcademyLesson_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AcademyLesson_moduleId_isActive_order_idx"
    ON "AcademyLesson"("moduleId", "isActive", "order");

CREATE UNIQUE INDEX "AcademyLesson_moduleId_order_key"
    ON "AcademyLesson"("moduleId", "order");


-- ============================================================
-- 5. AcademyRegistration
-- ============================================================

CREATE TABLE "AcademyRegistration" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "courseId" UUID NOT NULL,
    "status" "WorkflowStatus" NOT NULL DEFAULT 'OPEN',
    "verifiedAt" TIMESTAMP(3),
    "paymentId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademyRegistration_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AcademyRegistration_paymentId_key"
    ON "AcademyRegistration"("paymentId");

CREATE INDEX "AcademyRegistration_userId_status_idx"
    ON "AcademyRegistration"("userId", "status");

CREATE UNIQUE INDEX "AcademyRegistration_userId_courseId_key"
    ON "AcademyRegistration"("userId", "courseId");


-- ============================================================
-- 6. AcademyEnrollment
-- ============================================================

CREATE TABLE "AcademyEnrollment" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "courseId" UUID NOT NULL,
    "registrationId" UUID NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'APPLIED',
    "enrolledAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "progressPercent" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AcademyEnrollment_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AcademyEnrollment_registrationId_key"
    ON "AcademyEnrollment"("registrationId");

CREATE UNIQUE INDEX "AcademyEnrollment_userId_courseId_key"
    ON "AcademyEnrollment"("userId", "courseId");

CREATE INDEX "AcademyEnrollment_userId_status_idx"
    ON "AcademyEnrollment"("userId", "status");


-- ============================================================
-- 7. AcademyLessonProgress
-- ============================================================

CREATE TABLE "AcademyLessonProgress" (
    "id" UUID NOT NULL,
    "enrollmentId" UUID NOT NULL,
    "lessonId" UUID NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "AcademyLessonProgress_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AcademyLessonProgress_enrollmentId_completedAt_idx"
    ON "AcademyLessonProgress"("enrollmentId", "completedAt");

CREATE UNIQUE INDEX "AcademyLessonProgress_enrollmentId_lessonId_key"
    ON "AcademyLessonProgress"("enrollmentId", "lessonId");


-- ============================================================
-- 8. AcademyAssessment
-- ============================================================

CREATE TABLE "AcademyAssessment" (
    "id" UUID NOT NULL,
    "courseId" UUID NOT NULL,
    "moduleId" UUID,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "maximumScore" DECIMAL(6,2),
    "passingScore" DECIMAL(6,2),
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademyAssessment_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AcademyAssessment_courseId_isActive_idx"
    ON "AcademyAssessment"("courseId", "isActive");

CREATE INDEX "AcademyAssessment_moduleId_idx"
    ON "AcademyAssessment"("moduleId");


-- ============================================================
-- 9. AcademyResult
-- ============================================================

CREATE TABLE "AcademyResult" (
    "id" UUID NOT NULL,
    "enrollmentId" UUID NOT NULL,
    "assessmentId" UUID NOT NULL,
    "score" DECIMAL(6,2),
    "maximumScore" DECIMAL(6,2),
    "completedAt" TIMESTAMP(3),
    "passed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AcademyResult_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AcademyResult_enrollmentId_passed_idx"
    ON "AcademyResult"("enrollmentId", "passed");

CREATE UNIQUE INDEX "AcademyResult_enrollmentId_assessmentId_key"
    ON "AcademyResult"("enrollmentId", "assessmentId");


-- ============================================================
-- 10. AcademyCompletion
-- ============================================================

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

CREATE UNIQUE INDEX "AcademyCompletion_completionCode_key"
    ON "AcademyCompletion"("completionCode");

CREATE UNIQUE INDEX "AcademyCompletion_enrollmentId_key"
    ON "AcademyCompletion"("enrollmentId");


-- ============================================================
-- 11. Academy foreign keys
-- ============================================================

ALTER TABLE "AcademyModule"
    ADD CONSTRAINT "AcademyModule_courseId_fkey"
    FOREIGN KEY ("courseId")
    REFERENCES "AcademyCourse"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "AcademyLesson"
    ADD CONSTRAINT "AcademyLesson_moduleId_fkey"
    FOREIGN KEY ("moduleId")
    REFERENCES "AcademyModule"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "AcademyRegistration"
    ADD CONSTRAINT "AcademyRegistration_userId_fkey"
    FOREIGN KEY ("userId")
    REFERENCES "User"("id")
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE "AcademyRegistration"
    ADD CONSTRAINT "AcademyRegistration_courseId_fkey"
    FOREIGN KEY ("courseId")
    REFERENCES "AcademyCourse"("id")
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE "AcademyRegistration"
    ADD CONSTRAINT "AcademyRegistration_paymentId_fkey"
    FOREIGN KEY ("paymentId")
    REFERENCES "Payment"("id")
    ON DELETE SET NULL
    ON UPDATE CASCADE;

ALTER TABLE "AcademyEnrollment"
    ADD CONSTRAINT "AcademyEnrollment_userId_fkey"
    FOREIGN KEY ("userId")
    REFERENCES "User"("id")
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE "AcademyEnrollment"
    ADD CONSTRAINT "AcademyEnrollment_courseId_fkey"
    FOREIGN KEY ("courseId")
    REFERENCES "AcademyCourse"("id")
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE "AcademyEnrollment"
    ADD CONSTRAINT "AcademyEnrollment_registrationId_fkey"
    FOREIGN KEY ("registrationId")
    REFERENCES "AcademyRegistration"("id")
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE "AcademyLessonProgress"
    ADD CONSTRAINT "AcademyLessonProgress_enrollmentId_fkey"
    FOREIGN KEY ("enrollmentId")
    REFERENCES "AcademyEnrollment"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "AcademyLessonProgress"
    ADD CONSTRAINT "AcademyLessonProgress_lessonId_fkey"
    FOREIGN KEY ("lessonId")
    REFERENCES "AcademyLesson"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "AcademyAssessment"
    ADD CONSTRAINT "AcademyAssessment_courseId_fkey"
    FOREIGN KEY ("courseId")
    REFERENCES "AcademyCourse"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "AcademyAssessment"
    ADD CONSTRAINT "AcademyAssessment_moduleId_fkey"
    FOREIGN KEY ("moduleId")
    REFERENCES "AcademyModule"("id")
    ON DELETE SET NULL
    ON UPDATE CASCADE;

ALTER TABLE "AcademyResult"
    ADD CONSTRAINT "AcademyResult_enrollmentId_fkey"
    FOREIGN KEY ("enrollmentId")
    REFERENCES "AcademyEnrollment"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "AcademyResult"
    ADD CONSTRAINT "AcademyResult_assessmentId_fkey"
    FOREIGN KEY ("assessmentId")
    REFERENCES "AcademyAssessment"("id")
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE "AcademyCompletion"
    ADD CONSTRAINT "AcademyCompletion_userId_fkey"
    FOREIGN KEY ("userId")
    REFERENCES "User"("id")
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE "AcademyCompletion"
    ADD CONSTRAINT "AcademyCompletion_courseId_fkey"
    FOREIGN KEY ("courseId")
    REFERENCES "AcademyCourse"("id")
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE "AcademyCompletion"
    ADD CONSTRAINT "AcademyCompletion_enrollmentId_fkey"
    FOREIGN KEY ("enrollmentId")
    REFERENCES "AcademyEnrollment"("id")
    ON DELETE RESTRICT
    ON UPDATE CASCADE;





