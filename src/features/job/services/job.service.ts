import { Job, JobStatus } from '@prisma/client';
import { companyService } from '~/features/company/services/company.service';
import { getPaginationAndFilters } from '~/globals/helpers/pagination-filter.helper';
import prisma from '~/prisma';
import { jobRoleService } from './job-role.service';
import { BadRequestException, NotFoundException } from '~/globals/cores/error.core';
import { serializeData } from '~/globals/helpers/serialize.helper';
import { IJob } from '../interfaces/job.interface';
import { packageService } from '~/features/package/services/package.service';
import { excludeFields } from '~/globals/helpers/excludeFields.helper';
import { jobRedis } from '~/globals/cores/redis/job.redis';
import RedisKey from '~/globals/constants/redis-keys.constaint';

class JobService {
  public async create(requestBody: IJob, currentUser: UserPayload): Promise<Job> {
    const { companyId, title, description, minSalary, maxSalary, jobRoleName } = requestBody;

    await companyService.findOne(companyId, currentUser.id);
    await jobRoleService.findOne(jobRoleName);

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      include: { recruiterPackages: true }
    });

    if (!user) throw new NotFoundException('user does not exist');

    const activePackage = user.recruiterPackages.find((pgk) => new Date(Date.now()) < new Date(pgk.endDate));

    if (!activePackage) throw new BadRequestException('You must buy the package');

    const jobsCount = await prisma.job.count({
      where: {
        postById: currentUser.id,
        createdAt: { gt: new Date(activePackage.startDate) },
        isDeleted: false
      }
    });

    const packageEntity = await packageService.readOne(activePackage.packageId, { isActive: true });

    if (jobsCount >= packageEntity.jobPostLimit)
      throw new BadRequestException('You already reach the limit of current package');

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
      additionalCondition: { minSalary: { gte: minSalary }, isDeleted: false },
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
    const jobKey = `${RedisKey.JOBS_KEY}:${id}`;

    const jobCached = await jobRedis.getJobFromRedis(jobKey);

    if (jobCached) return jobCached;

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        company: true,
        postBy: true
      }
    });

    if (!job) throw new NotFoundException(`Cannot find job: ${id}`);

    const dataConfig = {
      company: [
        { newKey: 'companyName', property: 'name' },
        { newKey: 'companyWebsiteUrl', property: 'websiteUrl' }
      ],
      postBy: [{ newKey: 'postByName', property: 'name' }]
    };

    const data = serializeData(job, dataConfig);

    await jobRedis.saveJobToRedis(jobKey, data);

    return excludeFields(data, ['companyId', 'postById']);
  }

  public async update(id: number, companyId: number, requestBody: IJob, currentUser: UserPayload): Promise<Job> {
    const { title, description, minSalary, maxSalary } = requestBody;

    await this.findOne(id, companyId, currentUser.id);

    const job = await prisma.job.update({
      where: { id, companyId, postById: currentUser.id },
      data: { title, description, minSalary, maxSalary }
    });

    return job;
  }

  public async updateStatus(id: number, companyId: number, status: JobStatus, currentUser: UserPayload): Promise<Job> {
    await this.findOne(id, companyId, currentUser.id);

    const job = await prisma.job.update({
      where: { id, companyId, postById: currentUser.id },
      data: { status }
    });

    return job;
  }

  public async remove(id: number, companyId: number, currentUser: UserPayload): Promise<void> {
    await this.findOne(id, companyId, currentUser.id);

    const job = await prisma.job.update({
      where: { id, companyId, postById: currentUser.id },
      data: { isDeleted: true }
    });
  }

  private async findOne(id: number, companyId: number, userId: number): Promise<Job> {
    const job = await prisma.job.findFirst({
      where: { id, companyId, postById: userId }
    });

    if (!job) throw new NotFoundException(`Cannot find company: ${companyId} belong to user: ${userId}`);

    return job;
  }

  public async findOneActive(jobId: number) {
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        status: 'ACTIVE'
      }
    });

    if (!job) throw new NotFoundException('This job is no longer active');

    return job;
  }

  public async findJobByUser(id: number, userId: number): Promise<Job> {
    const job = await prisma.job.findFirst({
      where: { id, postById: userId }
    });

    if (!job) throw new NotFoundException(`Cannot find job`);

    return job;
  }
}

export const jobService: JobService = new JobService();
