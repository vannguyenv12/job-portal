import prisma from '~/prisma';
import { jobService } from './job.service';
import { JobSkill } from '@prisma/client';

class JobSkillService {
  public async create(jobId: number, skillName: string, currentUser: UserPayload): Promise<JobSkill> {
    await jobService.findJobByUser(jobId, currentUser.id);

    const jobSkill = await prisma.jobSkill.create({
      data: {
        jobId,
        skillName
      }
    });

    return jobSkill;
  }

  public async read(jobId: number): Promise<JobSkill[]> {
    const jobSkills = await prisma.jobSkill.findMany({
      where: { jobId }
    });

    return jobSkills;
  }

  public async remove(jobId: number, skillName: string, currentUser: UserPayload): Promise<void> {
    await jobService.findJobByUser(jobId, currentUser.id);

    await prisma.jobSkill.delete({
      where: {
        jobId_skillName: {
          jobId,
          skillName
        }
      }
    });
  }
}

export const jobSkillService: JobSkillService = new JobSkillService();
