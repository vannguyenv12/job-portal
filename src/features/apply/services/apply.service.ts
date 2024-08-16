import { Apply } from '@prisma/client';
import { candidateProfileService } from '~/features/candidate-profile/services/candidate-profile.service';
import { jobService } from '~/features/job/services/job.service';
import { getPaginationAndFilters } from '~/globals/helpers/pagination-filter.helper';
import { serializeData } from '~/globals/helpers/serialize.helper';
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

  public async readMeRecruiter({ page, limit }: any, jobId: number, currentUser: UserPayload) {
    const job = await jobService.findJobByUser(jobId, currentUser.id);

    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter: '',
      filterFields: [],
      entity: 'apply',
      additionalCondition: { jobId: job.id },
      orderCondition: {},
      include: { candidateProfile: true }
    });

    const dataConfig = {
      candidateProfile: [
        { newKey: 'candidateName', property: 'fullName' },
        { newKey: 'candidatePhone', property: 'phone' },
        { newKey: 'candidateCv', property: 'cv' }
      ]
    };

    const results = data.map((apply: Apply) => serializeData(apply, dataConfig));

    return { applies: results, totalCounts };
  }
}

export const applyService: ApplyService = new ApplyService();
