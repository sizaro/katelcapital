/*
  Warnings:

  - You are about to drop the column `moduleId` on the `AcademyAssessment` table. All the data in the column will be lost.
  - You are about to drop the `AcademyLesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AcademyLessonProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AcademyModule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AcademyResult` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AcademyContentBlockType" AS ENUM ('TEXT', 'VIDEO', 'IMAGE', 'PDF', 'CALLOUT', 'TABLE', 'QUICK_CHECK');

-- CreateEnum
CREATE TYPE "AcademyMediaProvider" AS ENUM ('CLOUDINARY');

-- CreateEnum
CREATE TYPE "AcademyMediaType" AS ENUM ('IMAGE', 'VIDEO', 'PDF', 'DOCUMENT', 'AUDIO');

-- CreateEnum
CREATE TYPE "AcademyContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AcademyQuestionType" AS ENUM ('MULTIPLE_CHOICE', 'SINGLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER', 'LONG_ANSWER', 'FILE_UPLOAD', 'MATCHING', 'ORDERING', 'MULTI_SELECT', 'PRACTICAL_TASK');

-- CreateEnum
CREATE TYPE "AcademyGradingMode" AS ENUM ('AUTOMATIC', 'MANUAL');

-- CreateEnum
CREATE TYPE "AcademyAssessmentAttemptStatus" AS ENUM ('IN_PROGRESS', 'SUBMITTED', 'AWAITING_REVIEW', 'GRADED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AcademyAttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'EXCUSED');

-- CreateEnum
CREATE TYPE "AcademyReadinessStatus" AS ENUM ('NOT_READY', 'UNDER_REVIEW', 'READY', 'NOT_APPROVED');

-- DropForeignKey
ALTER TABLE "AcademyAssessment" DROP CONSTRAINT "AcademyAssessment_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "AcademyLesson" DROP CONSTRAINT "AcademyLesson_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "AcademyLessonProgress" DROP CONSTRAINT "AcademyLessonProgress_enrollmentId_fkey";

-- DropForeignKey
ALTER TABLE "AcademyLessonProgress" DROP CONSTRAINT "AcademyLessonProgress_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "AcademyModule" DROP CONSTRAINT "AcademyModule_courseId_fkey";

-- DropForeignKey
ALTER TABLE "AcademyResult" DROP CONSTRAINT "AcademyResult_assessmentId_fkey";

-- DropForeignKey
ALTER TABLE "AcademyResult" DROP CONSTRAINT "AcademyResult_enrollmentId_fkey";

-- DropIndex
DROP INDEX "AcademyAssessment_moduleId_idx";

-- AlterTable
ALTER TABLE "AcademyAssessment" DROP COLUMN "moduleId",
ADD COLUMN     "sessionId" UUID,
ADD COLUMN     "status" "AcademyContentStatus" NOT NULL DEFAULT 'DRAFT';

-- DropTable
DROP TABLE "AcademyLesson";

-- DropTable
DROP TABLE "AcademyLessonProgress";

-- DropTable
DROP TABLE "AcademyModule";

-- DropTable
DROP TABLE "AcademyResult";

-- CreateTable
CREATE TABLE "AcademyWeek" (
    "id" UUID NOT NULL,
    "courseId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "status" "AcademyContentStatus" NOT NULL DEFAULT 'DRAFT',
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AcademyWeek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademySession" (
    "id" UUID NOT NULL,
    "weekId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "status" "AcademyContentStatus" NOT NULL DEFAULT 'DRAFT',
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AcademySession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyContentBlock" (
    "id" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "type" "AcademyContentBlockType" NOT NULL,
    "title" TEXT,
    "textContent" TEXT,
    "configuration" JSONB,
    "order" INTEGER NOT NULL,
    "status" "AcademyContentStatus" NOT NULL DEFAULT 'DRAFT',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "mediaId" UUID,
    "questionId" UUID,

    CONSTRAINT "AcademyContentBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyMedia" (
    "id" UUID NOT NULL,
    "provider" "AcademyMediaProvider" NOT NULL,
    "type" "AcademyMediaType" NOT NULL,
    "publicId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "fileName" TEXT,
    "format" TEXT,
    "duration" INTEGER,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademyMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyQuestion" (
    "id" UUID NOT NULL,
    "prompt" TEXT NOT NULL,
    "type" "AcademyQuestionType" NOT NULL,
    "points" DECIMAL(6,2) NOT NULL DEFAULT 1,
    "gradingMode" "AcademyGradingMode" NOT NULL DEFAULT 'AUTOMATIC',
    "correctAnswer" JSONB,
    "explanation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademyQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyQuestionOption" (
    "id" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AcademyQuestionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademySessionProgress" (
    "id" UUID NOT NULL,
    "enrollmentId" UUID NOT NULL,
    "sessionId" UUID NOT NULL,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "AcademySessionProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyContentBlockProgress" (
    "id" UUID NOT NULL,
    "enrollmentId" UUID NOT NULL,
    "contentBlockId" UUID NOT NULL,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "metadata" JSONB,

    CONSTRAINT "AcademyContentBlockProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyAssessmentQuestion" (
    "id" UUID NOT NULL,
    "assessmentId" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "AcademyAssessmentQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyAssessmentAttempt" (
    "id" UUID NOT NULL,
    "enrollmentId" UUID NOT NULL,
    "assessmentId" UUID NOT NULL,
    "attemptNumber" INTEGER NOT NULL,
    "status" "AcademyAssessmentAttemptStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "score" DECIMAL(6,2),
    "maximumScore" DECIMAL(6,2),
    "percentage" DECIMAL(6,2),
    "passed" BOOLEAN,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" TIMESTAMP(3),
    "gradedAt" TIMESTAMP(3),
    "reviewedById" UUID,
    "feedback" TEXT,

    CONSTRAINT "AcademyAssessmentAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyQuestionResponse" (
    "id" UUID NOT NULL,
    "attemptId" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "answer" JSONB,
    "score" DECIMAL(6,2),
    "isCorrect" BOOLEAN,
    "feedback" TEXT,
    "gradedAt" TIMESTAMP(3),
    "reviewedById" UUID,

    CONSTRAINT "AcademyQuestionResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyGathering" (
    "id" UUID NOT NULL,
    "courseId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3),
    "location" TEXT,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademyGathering_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyGatheringAttendance" (
    "id" UUID NOT NULL,
    "gatheringId" UUID NOT NULL,
    "enrollmentId" UUID NOT NULL,
    "status" "AcademyAttendanceStatus" NOT NULL,
    "recordedById" UUID,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "AcademyGatheringAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademyReadiness" (
    "id" UUID NOT NULL,
    "enrollmentId" UUID NOT NULL,
    "courseId" UUID NOT NULL,
    "status" "AcademyReadinessStatus" NOT NULL DEFAULT 'NOT_READY',
    "score" DECIMAL(6,2),
    "reviewedById" UUID,
    "reviewedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademyReadiness_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AcademyWeek_courseId_isActive_order_idx" ON "AcademyWeek"("courseId", "isActive", "order");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyWeek_courseId_order_key" ON "AcademyWeek"("courseId", "order");

-- CreateIndex
CREATE INDEX "AcademySession_weekId_isActive_order_idx" ON "AcademySession"("weekId", "isActive", "order");

-- CreateIndex
CREATE UNIQUE INDEX "AcademySession_weekId_order_key" ON "AcademySession"("weekId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyContentBlock_questionId_key" ON "AcademyContentBlock"("questionId");

-- CreateIndex
CREATE INDEX "AcademyContentBlock_sessionId_status_order_idx" ON "AcademyContentBlock"("sessionId", "status", "order");

-- CreateIndex
CREATE INDEX "AcademyContentBlock_mediaId_idx" ON "AcademyContentBlock"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyContentBlock_sessionId_order_key" ON "AcademyContentBlock"("sessionId", "order");

-- CreateIndex
CREATE INDEX "AcademyMedia_provider_publicId_idx" ON "AcademyMedia"("provider", "publicId");

-- CreateIndex
CREATE INDEX "AcademyQuestion_type_gradingMode_idx" ON "AcademyQuestion"("type", "gradingMode");

-- CreateIndex
CREATE INDEX "AcademyQuestionOption_questionId_idx" ON "AcademyQuestionOption"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyQuestionOption_questionId_order_key" ON "AcademyQuestionOption"("questionId", "order");

-- CreateIndex
CREATE INDEX "AcademySessionProgress_enrollmentId_completedAt_idx" ON "AcademySessionProgress"("enrollmentId", "completedAt");

-- CreateIndex
CREATE UNIQUE INDEX "AcademySessionProgress_enrollmentId_sessionId_key" ON "AcademySessionProgress"("enrollmentId", "sessionId");

-- CreateIndex
CREATE INDEX "AcademyContentBlockProgress_enrollmentId_completedAt_idx" ON "AcademyContentBlockProgress"("enrollmentId", "completedAt");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyContentBlockProgress_enrollmentId_contentBlockId_key" ON "AcademyContentBlockProgress"("enrollmentId", "contentBlockId");

-- CreateIndex
CREATE INDEX "AcademyAssessmentQuestion_questionId_idx" ON "AcademyAssessmentQuestion"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyAssessmentQuestion_assessmentId_order_key" ON "AcademyAssessmentQuestion"("assessmentId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyAssessmentQuestion_assessmentId_questionId_key" ON "AcademyAssessmentQuestion"("assessmentId", "questionId");

-- CreateIndex
CREATE INDEX "AcademyAssessmentAttempt_enrollmentId_status_idx" ON "AcademyAssessmentAttempt"("enrollmentId", "status");

-- CreateIndex
CREATE INDEX "AcademyAssessmentAttempt_assessmentId_status_idx" ON "AcademyAssessmentAttempt"("assessmentId", "status");

-- CreateIndex
CREATE INDEX "AcademyAssessmentAttempt_reviewedById_idx" ON "AcademyAssessmentAttempt"("reviewedById");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyAssessmentAttempt_enrollmentId_assessmentId_attemptN_key" ON "AcademyAssessmentAttempt"("enrollmentId", "assessmentId", "attemptNumber");

-- CreateIndex
CREATE INDEX "AcademyQuestionResponse_questionId_idx" ON "AcademyQuestionResponse"("questionId");

-- CreateIndex
CREATE INDEX "AcademyQuestionResponse_reviewedById_idx" ON "AcademyQuestionResponse"("reviewedById");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyQuestionResponse_attemptId_questionId_key" ON "AcademyQuestionResponse"("attemptId", "questionId");

-- CreateIndex
CREATE INDEX "AcademyGathering_courseId_startsAt_idx" ON "AcademyGathering"("courseId", "startsAt");

-- CreateIndex
CREATE INDEX "AcademyGatheringAttendance_enrollmentId_status_idx" ON "AcademyGatheringAttendance"("enrollmentId", "status");

-- CreateIndex
CREATE INDEX "AcademyGatheringAttendance_recordedById_idx" ON "AcademyGatheringAttendance"("recordedById");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyGatheringAttendance_gatheringId_enrollmentId_key" ON "AcademyGatheringAttendance"("gatheringId", "enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "AcademyReadiness_enrollmentId_key" ON "AcademyReadiness"("enrollmentId");

-- CreateIndex
CREATE INDEX "AcademyReadiness_courseId_status_idx" ON "AcademyReadiness"("courseId", "status");

-- CreateIndex
CREATE INDEX "AcademyReadiness_reviewedById_idx" ON "AcademyReadiness"("reviewedById");

-- CreateIndex
CREATE INDEX "AcademyAssessment_sessionId_idx" ON "AcademyAssessment"("sessionId");

-- AddForeignKey
ALTER TABLE "AcademyWeek" ADD CONSTRAINT "AcademyWeek_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "AcademyCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademySession" ADD CONSTRAINT "AcademySession_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "AcademyWeek"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyContentBlock" ADD CONSTRAINT "AcademyContentBlock_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AcademySession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyContentBlock" ADD CONSTRAINT "AcademyContentBlock_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "AcademyMedia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyContentBlock" ADD CONSTRAINT "AcademyContentBlock_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "AcademyQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyQuestionOption" ADD CONSTRAINT "AcademyQuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "AcademyQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademySessionProgress" ADD CONSTRAINT "AcademySessionProgress_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "AcademyEnrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademySessionProgress" ADD CONSTRAINT "AcademySessionProgress_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AcademySession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyContentBlockProgress" ADD CONSTRAINT "AcademyContentBlockProgress_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "AcademyEnrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyContentBlockProgress" ADD CONSTRAINT "AcademyContentBlockProgress_contentBlockId_fkey" FOREIGN KEY ("contentBlockId") REFERENCES "AcademyContentBlock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyAssessment" ADD CONSTRAINT "AcademyAssessment_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AcademySession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyAssessmentQuestion" ADD CONSTRAINT "AcademyAssessmentQuestion_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "AcademyAssessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyAssessmentQuestion" ADD CONSTRAINT "AcademyAssessmentQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "AcademyQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyAssessmentAttempt" ADD CONSTRAINT "AcademyAssessmentAttempt_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "AcademyEnrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyAssessmentAttempt" ADD CONSTRAINT "AcademyAssessmentAttempt_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "AcademyAssessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyAssessmentAttempt" ADD CONSTRAINT "AcademyAssessmentAttempt_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyQuestionResponse" ADD CONSTRAINT "AcademyQuestionResponse_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "AcademyAssessmentAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyQuestionResponse" ADD CONSTRAINT "AcademyQuestionResponse_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "AcademyQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyQuestionResponse" ADD CONSTRAINT "AcademyQuestionResponse_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyGathering" ADD CONSTRAINT "AcademyGathering_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "AcademyCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyGatheringAttendance" ADD CONSTRAINT "AcademyGatheringAttendance_gatheringId_fkey" FOREIGN KEY ("gatheringId") REFERENCES "AcademyGathering"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyGatheringAttendance" ADD CONSTRAINT "AcademyGatheringAttendance_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "AcademyEnrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyGatheringAttendance" ADD CONSTRAINT "AcademyGatheringAttendance_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyReadiness" ADD CONSTRAINT "AcademyReadiness_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "AcademyEnrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyReadiness" ADD CONSTRAINT "AcademyReadiness_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "AcademyCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademyReadiness" ADD CONSTRAINT "AcademyReadiness_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
