import prisma from '~/prisma';
import { jobService } from './job.service';
import { Benefit, JobBenefit } from '@prisma/client';
import { NotFoundException } from '~/globals/cores/error.core';

class JobBenefitService {
  public async create(jobId: number, benefitName: string, currentUser: UserPayload): Promise<JobBenefit> {
    await jobService.findJobByUser(jobId, currentUser.id);
    await this.findBenefit(benefitName);

    const jobBenefit = await prisma.jobBenefit.create({
      data: {
        jobId,
        benefitName
      }
    });

    return jobBenefit;
  }

  public async findBenefit(name: string): Promise<Benefit> {
    const benefit = await prisma.benefit.findUnique({
      where: {
        name
      }
    });

    if (!benefit) throw new NotFoundException(`Benefit: ${name} does not exist`);

    return benefit;
  }
}

export const jobBenefitService: JobBenefitService = new JobBenefitService();
