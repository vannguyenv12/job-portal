import { JobRole } from '@prisma/client';
import { getPaginationAndFilters } from '~/globals/helpers/pagination-filter.helper';
import prisma from '~/prisma';

class JobRoleService {
  public async create(name: string): Promise<JobRole> {
    const jobRole = await prisma.jobRole.create({
      data: { name }
    });

    return jobRole;
  }

  public async readAll({ page, limit, filter }: any) {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['name'],
      entity: 'jobRole'
    });

    return { jobRoles: data, totalCounts };
  }
}

export const jobRoleService: JobRoleService = new JobRoleService();
