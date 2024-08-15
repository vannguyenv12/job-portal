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

  public async read(jobId: number): Promise<JobBenefit[]> {
    const jobBenefits = await prisma.jobBenefit.findMany({
      where: {
        jobId
      }
    });

    return jobBenefits;
  }

  public async remove(jobId: number, benefitName: string, currentUser: UserPayload): Promise<void> {
    await jobService.findJobByUser(jobId, currentUser.id);
    await this.findBenefit(benefitName);
    await this.findOne(jobId, benefitName);

    await prisma.jobBenefit.delete({
      where: {
        jobId_benefitName: {
          jobId,
          benefitName
        }
      }
    });
  }

  private async findOne(jobId: number, benefitName: string): Promise<JobBenefit> {
    const jobBenefit = await prisma.jobBenefit.findUnique({
      where: {
        jobId_benefitName: {
          jobId,
          benefitName
        }
      }
    });

    if (!jobBenefit) throw new NotFoundException(`Cannot find benefit: ${jobBenefit} in this job`);

    return jobBenefit;
  }
}

export const jobBenefitService: JobBenefitService = new JobBenefitService();
