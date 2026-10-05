-- DropForeignKey

ALTER TABLE "AcademyAssessment" DROP CONSTRAINT "AcademyAssessment_sessionId_fkey";

-- AlterTable

ALTER TABLE "AcademyCourse" ALTER COLUMN "durationWeeks" DROP DEFAULT;

-- AddForeignKey

ALTER TABLE "AcademyAssessment" ADD CONSTRAINT "AcademyAssessment_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AcademySession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Enforce one final exam per course

CREATE UNIQUE INDEX "AcademyAssessment_one_final_exam_per_course_idx"
ON "AcademyAssessment" ("courseId")
WHERE "type" = 'FINAL_EXAM';

-- Final exams are course-level assessments and cannot belong to a session

ALTER TABLE "AcademyAssessment"
ADD CONSTRAINT "AcademyAssessment_final_exam_must_be_course_level"
CHECK ("type" <> 'FINAL_EXAM' OR "sessionId" IS NULL);