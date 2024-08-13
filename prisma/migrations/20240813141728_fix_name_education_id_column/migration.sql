/*
  Warnings:

  - The primary key for the `CandidateEducation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `edutcationId` on the `CandidateEducation` table. All the data in the column will be lost.
  - Added the required column `educationId` to the `CandidateEducation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CandidateEducation" DROP CONSTRAINT "CandidateEducation_edutcationId_fkey";

-- AlterTable
ALTER TABLE "CandidateEducation" DROP CONSTRAINT "CandidateEducation_pkey",
DROP COLUMN "edutcationId",
ADD COLUMN     "educationId" INTEGER NOT NULL,
ADD CONSTRAINT "CandidateEducation_pkey" PRIMARY KEY ("candidateProfileId", "educationId");

-- AddForeignKey
ALTER TABLE "CandidateEducation" ADD CONSTRAINT "CandidateEducation_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "Education"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
