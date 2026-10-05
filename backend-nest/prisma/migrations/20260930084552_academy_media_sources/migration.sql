/*
  Warnings:

  - Added the required column `sourceType` to the `AcademyMedia` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AcademyMediaSourceType" AS ENUM ('UPLOADED', 'EXTERNAL');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AcademyMediaProvider" ADD VALUE 'AMAZON_S3';
ALTER TYPE "AcademyMediaProvider" ADD VALUE 'YOUTUBE';
ALTER TYPE "AcademyMediaProvider" ADD VALUE 'VIMEO';
ALTER TYPE "AcademyMediaProvider" ADD VALUE 'OTHER';

-- AlterTable
ALTER TABLE "AcademyMedia" ADD COLUMN     "sourceType" "AcademyMediaSourceType" NOT NULL,
ALTER COLUMN "publicId" DROP NOT NULL;
