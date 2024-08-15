import { Job } from '@prisma/client';
import { companyService } from '~/features/company/services/company.service';
import prisma from '~/prisma';

class JobService {
  public async create(requestBody: any, currentUser: UserPayload): Promise<Job> {
    const { companyId, title, description, minSalary, maxSalary, jobRoleName } = requestBody;

    await companyService.findOne(companyId, currentUser.id);

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
}

export const jobService: JobService = new JobService();
