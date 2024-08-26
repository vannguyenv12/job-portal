import { Job } from '@prisma/client';
import RedisClient from './redis.client';

const redisClient = new RedisClient();

class JobRedis {
  public async getJobFromRedis(jobKey: string) {
    const jobCached = await redisClient.client.hGetAll(jobKey);

    if (Object.keys(jobCached).length > 0) {
      console.log('go to redis', jobCached);
      const data = {
        id: parseInt(jobKey.split(':')[1]),
        ...jobCached,
        minSalary: parseInt(jobCached.minSalary),
        maxSalary: parseInt(jobCached.maxSalary),
        totalViews: parseInt(jobCached.totalViews),
        createdAt: new Date(jobCached.createdAt),
        updatedAt: new Date(jobCached.updatedAt),
        isDeleted: jobCached.isDeleted === 'true' ? true : false
      };

      return data as Job;
    }

    return null;
  }

  public async saveJobToRedis(jobKey: string, data: any) {
    const dataToRedis = {
      jobRoleName: data.jobRoleName,
      title: data.title,
      description: data.description,
      status: data.status,
      minSalary: data.minSalary,
      maxSalary: data.maxSalary,
      totalViews: data.totalViews,
      createdAt: `${data.createdAt}`,
      updatedAt: `${data.updatedAt}`,
      isDeleted: `${data.isDeleted}`,
      companyName: `${data.companyName}`,
      companyWebsiteUrl: data.companyWebsiteUrl ? `${data.companyWebsiteUrl}` : '',
      postByName: data.postByName
    };

    for (const [field, value] of Object.entries(dataToRedis)) {
      await redisClient.client.hSet(jobKey, field, value);
    }
  }

  public async updateJobToRedis(jobKey: string, data: Job) {
    const dataToRedis = {
      title: data.title,
      description: data.description,
      minSalary: data.minSalary,
      maxSalary: data.maxSalary || 0
    };

    for (const [field, value] of Object.entries(dataToRedis)) {
      await redisClient.client.hSet(jobKey, field, value);
    }
  }

  public async updateJobStatusToRedis(jobKey: string, status: string) {
    await redisClient.client.hSet(jobKey, 'status', status);
  }

  public async removeJobFromRedis(jobKey: string, isDeleted: boolean) {
    await redisClient.client.hSet(jobKey, 'isDeleted', `${isDeleted}`);
  }
}

export const jobRedis: JobRedis = new JobRedis();
