/*
  Warnings:

  - Added the required column `durationWeeks` to the `AcademyCourse` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AcademyAssessmentType" AS ENUM ('COURSE_ASSESSMENT', 'FINAL_EXAM');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EnrollmentStatus" ADD VALUE 'FAILED';
ALTER TYPE "EnrollmentStatus" ADD VALUE 'EXPIRED';

-- DropIndex
DROP INDEX "AcademyAssessment_courseId_isActive_idx";

-- DropIndex
DROP INDEX "AcademyEnrollment_userId_courseId_key";

-- DropIndex
DROP INDEX "AcademyRegistration_userId_courseId_key";

-- DropIndex
DROP INDEX "AcademyRegistration_userId_status_idx";

-- AlterTable
ALTER TABLE "AcademyAssessment" ADD COLUMN     "type" "AcademyAssessmentType" NOT NULL DEFAULT 'COURSE_ASSESSMENT';

-- AlterTable
ALTER TABLE "AcademyCourse"
ADD COLUMN "durationWeeks" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "AcademyEnrollment" ADD COLUMN     "expiresAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "AcademyAssessment_courseId_type_isActive_idx" ON "AcademyAssessment"("courseId", "type", "isActive");

-- CreateIndex
CREATE INDEX "AcademyEnrollment_courseId_status_idx" ON "AcademyEnrollment"("courseId", "status");

-- CreateIndex
CREATE INDEX "AcademyEnrollment_expiresAt_idx" ON "AcademyEnrollment"("expiresAt");

-- CreateIndex
CREATE INDEX "AcademyRegistration_userId_courseId_status_idx" ON "AcademyRegistration"("userId", "courseId", "status");
