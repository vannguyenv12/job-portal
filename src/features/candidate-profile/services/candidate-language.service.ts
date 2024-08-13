import { CandidateLanguage, CandidateProfile, Level } from '@prisma/client';
import { candidateProfileService } from './candidate-profile.service';
import prisma from '~/prisma';

class CandidateLanguageService {
  public async create(requestBody: any, currentUser: UserPayload): Promise<CandidateLanguage> {
    const { languageName, level } = requestBody;

    const candidateProfile: CandidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);

    const candidateLanguage = await prisma.candidateLanguage.create({
      data: {
        candidateProfileId: candidateProfile.id,
        languageName,
        level
      }
    });

    return candidateLanguage;
  }

  public async readAll() {
    const candidateLanguages: CandidateLanguage[] = await prisma.candidateLanguage.findMany();

    return candidateLanguages;
  }

  public async readMyLanguages(currentUser: UserPayload) {
    const candidateProfile: CandidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);

    const candidateLanguages: CandidateLanguage[] = await prisma.candidateLanguage.findMany({
      where: { candidateProfileId: candidateProfile.id }
    });

    return candidateLanguages;
  }

  public async updateLevel(currentUser: UserPayload, languageName: string, level: Level): Promise<CandidateLanguage> {
    const candidateProfile: CandidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);

    const candidateLanguage = await prisma.candidateLanguage.update({
      where: {
        candidateProfileId_languageName: {
          candidateProfileId: candidateProfile.id,
          languageName
        }
      },
      data: { level }
    });

    return candidateLanguage;
  }
}

export const candidateLanguageService: CandidateLanguageService = new CandidateLanguageService();
