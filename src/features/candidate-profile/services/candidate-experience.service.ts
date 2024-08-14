import prisma from '~/prisma';
import { candidateProfileService } from './candidate-profile.service';
import { CandidateExperience } from '@prisma/client';

class CandidateExperienceService {
  public async create(requestBody: any, currentUser: UserPayload): Promise<CandidateExperience> {
    const { company, department, startDate, endDate, responsibilities } = requestBody;

    const candidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);

    const candidateExperience = await prisma.candidateExperience.create({
      data: {
        company,
        department,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        responsibilities,
        candidateProfileId: candidateProfile.id
      }
    });

    return candidateExperience;
  }
}

export const candidateExperienceService: CandidateExperienceService = new CandidateExperienceService();
