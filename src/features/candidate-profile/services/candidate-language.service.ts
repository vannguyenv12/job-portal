import { CandidateLanguage, CandidateProfile } from '@prisma/client';
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
}

export const candidateLanguageService: CandidateLanguageService = new CandidateLanguageService();
