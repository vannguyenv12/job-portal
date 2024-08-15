import { Job } from '@prisma/client';
import { companyService } from '~/features/company/services/company.service';
import { getPaginationAndFilters } from '~/globals/helpers/pagination-filter.helper';
import prisma from '~/prisma';
import { jobRoleService } from './job-role.service';
import { NotFoundException } from '~/globals/cores/error.core';

class JobService {
  public async create(requestBody: any, currentUser: UserPayload): Promise<Job> {
    const { companyId, title, description, minSalary, maxSalary, jobRoleName } = requestBody;

    await companyService.findOne(companyId, currentUser.id);
    await jobRoleService.findOne(jobRoleName);

    const job = await prisma.job.create({
      data: {
        companyId,
        jobRoleName,
        title,
        description,
        minSalary,
        maxSalary,
        postById: currentUser.id
      }
    });

    return job;
  }

  public async readAll({ page, limit, filter, minSalary }: any) {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['title', 'description'],
      entity: 'job',
      additionalCondition: { minSalary: { gte: minSalary } },
      orderCondition: { createdAt: 'desc' }
    });

    return { jobs: data, totalCounts };
  }

  public async readAllForRecruiter({ page, limit, filter, minSalary }: any, currentUser: UserPayload) {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['title', 'description'],
      entity: 'job',
      additionalCondition: { minSalary: { gte: minSalary }, postById: currentUser.id },
      orderCondition: { createdAt: 'desc' }
    });

    return { jobs: data, totalCounts };
  }

  public async readOne(id: number): Promise<Job> {
    const job = await prisma.job.findUnique({
      where: { id }
    });

    if (!job) throw new NotFoundException(`Cannot find job: ${id}`);

    return job;
  }
}

export const jobService: JobService = new JobService();
