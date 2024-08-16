import { Apply } from '@prisma/client';
import { candidateProfileService } from '~/features/candidate-profile/services/candidate-profile.service';
import prisma from '~/prisma';

class ApplyService {
  public async create(jobId: number, currentUser: UserPayload): Promise<Apply> {
    const candidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);

    const apply = await prisma.apply.create({
      data: {
        candidateProfileId: candidateProfile.id,
        jobId
      }
    });

    return apply;
  }
}

export const applyService: ApplyService = new ApplyService();
