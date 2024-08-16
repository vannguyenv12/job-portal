import { Apply } from '@prisma/client';
import { candidateProfileService } from '~/features/candidate-profile/services/candidate-profile.service';
import { getPaginationAndFilters } from '~/globals/helpers/pagination-filter.helper';
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

  public async readMe({ page, limit }: any, currentUser: UserPayload) {
    const candidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);

    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter: '',
      filterFields: [],
      entity: 'apply',
      additionalCondition: { candidateProfileId: candidateProfile.id }
    });

    return { applies: data, totalCounts };
  }
}

export const applyService: ApplyService = new ApplyService();
