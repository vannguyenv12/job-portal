-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('BACHELOR', 'MASTER', 'ENGINEER');

-- CreateTable
CREATE TABLE "CandidateEducation" (
    "candidateProfileId" INTEGER NOT NULL,
    "edutcationId" INTEGER NOT NULL,
    "major" TEXT NOT NULL,
    "degree" "Degree" NOT NULL DEFAULT 'BACHELOR',
    "yearStart" INTEGER NOT NULL,
    "yearEnd" INTEGER NOT NULL,

    CONSTRAINT "CandidateEducation_pkey" PRIMARY KEY ("candidateProfileId","edutcationId")
);

-- AddForeignKey
ALTER TABLE "CandidateEducation" ADD CONSTRAINT "CandidateEducation_candidateProfileId_fkey" FOREIGN KEY ("candidateProfileId") REFERENCES "CandidateProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateEducation" ADD CONSTRAINT "CandidateEducation_edutcationId_fkey" FOREIGN KEY ("edutcationId") REFERENCES "Education"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
