import { Apply } from '@prisma/client';
import { candidateProfileService } from '~/features/candidate-profile/services/candidate-profile.service';
import { jobService } from '~/features/job/services/job.service';
import { BadRequestException, NotFoundException } from '~/globals/cores/error.core';
import { getPaginationAndFilters } from '~/globals/helpers/pagination-filter.helper';
import { serializeData } from '~/globals/helpers/serialize.helper';
import prisma from '~/prisma';

class ApplyService {
  public async create(jobId: number, currentUser: UserPayload): Promise<Apply> {
    const candidateProfile = await candidateProfileService.readOneByUserId(currentUser.id);
    await jobService.findOneActive(jobId);
    const existApply = await this.findOne(candidateProfile.id, jobId);

    if (existApply) {
      throw new BadRequestException(`You cannot apply the same job`);
    }

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

  public async updateStatus(requestBody: any, currentUser: UserPayload) {
    const { candidateId, jobId, status } = requestBody;

    await jobService.findJobByUser(jobId, currentUser.id);
    const existApply = await this.findOne(candidateId, jobId);

    if (!existApply) throw new NotFoundException(`Cannot find application`);

    const apply = await prisma.apply.update({
      where: {
        candidateProfileId_jobId: {
          candidateProfileId: candidateId,
          jobId
        }
      },
      data: {
        status
      }
    });

    return apply;
  }

  public async findOne(candidateProfileId: number, jobId: number): Promise<Apply | null> {
    const apply = await prisma.apply.findUnique({
      where: {
        candidateProfileId_jobId: {
          candidateProfileId,
          jobId
        }
      }
    });

    return apply;
  }
}

export const applyService: ApplyService = new ApplyService();
