import { JobRole } from '@prisma/client';
import prisma from '~/prisma';

class JobRoleService {
  public async create(name: string): Promise<JobRole> {
    const jobRole = await prisma.jobRole.create({
      data: { name }
    });

    return jobRole;
  }
}

export const jobRoleService: JobRoleService = new JobRoleService();
