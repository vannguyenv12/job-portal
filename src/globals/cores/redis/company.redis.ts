import { Company } from '@prisma/client';
import RedisClient from './redis.client';

const redisClient = new RedisClient();

class CompanyRedis {
  public async getCompanyFromRedis(companyKey: string) {
    const companyCached = await redisClient.client.hGetAll(companyKey);

    if (Object.keys(companyCached).length > 0) {
      console.log('go to redis', companyCached);

      const data = {
        id: parseInt(companyKey.split(':')[1]),
        ...companyCached,
        teamSize: parseInt(companyCached.teamSize),
        establishmentDate: new Date(companyCached.establishmentDate),
        views: parseInt(companyCached.views),
        websiteUrl: companyCached.websiteUrl ?? null,
        isApproved: companyCached.isApproved === 'true' ? true : false,
        mapLink: companyCached.mapLink ?? null,
        address: companyCached.address ?? null,
        userId: parseInt(companyCached.userId)
      };
      return data as Company;
    }

    return null;
  }

  public async saveCompanyToRedis(companyKey: string, company: Company) {
    const dataToRedis = {
      name: company.name,
      description: company.description,
      teamSize: company.teamSize,
      establishmentDate: `${company.establishmentDate}`,
      views: company.views,
      websiteUrl: company.websiteUrl || '',
      isApproved: company.isApproved ? 'true' : 'false',
      mapLink: company.mapLink || '',
      address: company.address || '',
      userId: company.userId
    };

    for (const [field, value] of Object.entries(dataToRedis)) {
      await redisClient.client.hSet(companyKey, field, value);
    }
  }

  public async updateCompanyToRedis(companyKey: string, company: Company) {
    const dataToRedis = {
      name: company.name,
      description: company.description,
      teamSize: `${company.teamSize}`,
      establishmentDate: `${company.establishmentDate}`,
      websiteUrl: company.websiteUrl ?? '',
      mapLink: company.mapLink ?? '',
      address: company.address ?? ''
    };

    for (const [field, value] of Object.entries(dataToRedis)) {
      await redisClient.client.hSet(companyKey, field, value);
    }
  }

  public async approvedCompanyToRedis(companyKey: string, approved: boolean) {
    await redisClient.client.hSet(companyKey, 'isApproved', approved ? 'true' : 'false');
  }

  public async checkUserInSet(companyViewsKey: string, userId: number) {
    return await redisClient.client.sIsMember(companyViewsKey, userId.toString());
  }

  public async incrementCompanyView(companyKey: string) {
    await redisClient.client.hIncrBy(companyKey, 'views', 1);
  }

  public async addUserToSet(companyViewsKey: string, userId: number) {
    await redisClient.client.sAdd(companyViewsKey, userId.toString());
  }
}

export const companyRedis: CompanyRedis = new CompanyRedis();
