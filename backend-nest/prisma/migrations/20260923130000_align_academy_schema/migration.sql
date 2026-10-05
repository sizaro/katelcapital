-- Align the Academy tables with the Prisma schema.

ALTER TABLE "AcademyCompletion"
    DROP COLUMN "status",
    ADD COLUMN "status" "WorkflowStatus" NOT NULL DEFAULT 'COMPLETED';

ALTER TABLE "AcademyEnrollment"
    ALTER COLUMN "status" SET DEFAULT 'APPLIED',
    ALTER COLUMN "enrolledAt" DROP NOT NULL,
    ALTER COLUMN "enrolledAt" DROP DEFAULT;

ALTER TABLE "AcademyResult"
    ALTER COLUMN "score" DROP NOT NULL,
    ALTER COLUMN "maximumScore" DROP NOT NULL;
