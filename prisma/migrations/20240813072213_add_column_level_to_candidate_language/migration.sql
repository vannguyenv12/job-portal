-- CreateEnum
CREATE TYPE "Level" AS ENUM ('NATIVE', 'FLUENT', 'BASIC');

-- AlterTable
ALTER TABLE "CandidateLanguage" ADD COLUMN     "level" "Level" NOT NULL DEFAULT 'BASIC';
