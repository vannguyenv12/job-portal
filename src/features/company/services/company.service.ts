import { Company } from '@prisma/client';
import { NotFoundException } from '~/globals/cores/error.core';
import { getPaginationAndFilters } from '~/globals/helpers/pagination-filter.helper';
import prisma from '~/prisma';
import { ICompany } from '../interfaces/company.interface';
import { companyRedis } from '~/globals/cores/redis/company.redis';
import RedisKey from '~/globals/constants/redis-keys.constaint';

class CompanyService {
  public async create(requestBody: ICompany, currentUser: UserPayload): Promise<Company> {
    const { name, description, teamSize, establishmentDate, websiteUrl, mapLink, address } = requestBody;

    const company = await prisma.company.create({
      data: {
        name,
        description,
        teamSize,
        establishmentDate: new Date(establishmentDate),
        websiteUrl,
        mapLink,
        address,
        userId: currentUser.id
      }
    });

    return company;
  }

  public async readAll(): Promise<Company[]> {
    const companies = await prisma.company.findMany({ where: { isApproved: true } });

    return companies;
  }

  public async readAllPagination({ page, limit, filter }: any) {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['name', 'description'],
      entity: 'company',
      additionalCondition: { isApproved: true }
    });

    return { companies: data, totalCounts };
  }

  public async readAllPaginationForAdmin({ page, limit, filter }: any) {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['name', 'description'],
      entity: 'company'
    });

    return { companies: data, totalCounts };
  }

  public async readMyCompanies({ page, limit, filter }: any, currentUser: UserPayload) {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['name', 'description'],
      entity: 'company',
      additionalCondition: { userId: currentUser.id }
    });

    return { companies: data, totalCounts };
  }

  public async readOne(id: number, currentUser: UserPayload): Promise<Company> {
    // 1) Get company from redis
    const companyKey = `${RedisKey.COMPANiES_KEY}:${id}`;
    const companyViewsKey = `company_views:${id}`;

    const companyCached = await companyRedis.getCompanyFromRedis(companyKey);
    const isUserInSet = await companyRedis.checkUserInSet(companyViewsKey, currentUser.id);

    if (companyCached) {
      if (!isUserInSet) {
        await companyRedis.incrementCompanyView(companyKey);
        await companyRedis.addUserToSet(companyViewsKey, currentUser.id);
        const companyCached = await companyRedis.getCompanyFromRedis(companyKey);
        return companyCached as Company;
      }
      return companyCached;
    }

    const company = await prisma.company.findUnique({
      where: { id, isApproved: true }
    });

    if (!company) throw new NotFoundException(`Cannot find company with id: ${id}`);

    await companyRedis.saveCompanyToRedis(companyKey, company); // CREATE HASH

    if (!isUserInSet) {
      await companyRedis.incrementCompanyView(companyKey);
      await companyRedis.addUserToSet(companyViewsKey, currentUser.id);
    }

    return company; // real data in pg
  }

  public async readOneAdmin(id: number): Promise<Company> {
    // 1) Get company from redis
    const companyKey = `${RedisKey.COMPANiES_KEY}:${id}`;
    const companyCached = await companyRedis.getCompanyFromRedis(companyKey);

    if (companyCached) return companyCached;

    const company = await prisma.company.findUnique({
      where: { id }
    });

    if (!company) throw new NotFoundException(`Cannot find company with id: ${id}`);
    await companyRedis.saveCompanyToRedis(companyKey, company);

    return company;
  }

  public async findOne(companyId: number, userId: number): Promise<Company> {
    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
        userId
      }
    });

    if (!company) throw new NotFoundException(`Cannot find company ${companyId} of user ${userId}`);

    return company;
  }

  public async update(id: number, requestBody: ICompany, currentUser: UserPayload) {
    const { name, description, teamSize, establishmentDate, websiteUrl, mapLink, address } = requestBody;

    await this.findOne(id, currentUser.id);

    const company = await prisma.company.update({
      where: { id, userId: currentUser.id },
      data: {
        name,
        description,
        teamSize,
        establishmentDate: establishmentDate ? new Date(establishmentDate) : undefined,
        websiteUrl,
        mapLink,
        address
      }
    });

    const companyKey = `${RedisKey.COMPANiES_KEY}:${id}`;
    await companyRedis.updateCompanyToRedis(companyKey, company);

    return company;
  }

  public async approved(id: number, isApproved: boolean) {
    await this.readOneAdmin(id);

    const company = await prisma.company.update({
      where: { id },
      data: { isApproved }
    });

    const companyKey = `${RedisKey.COMPANiES_KEY}:${id}`;
    await companyRedis.approvedCompanyToRedis(companyKey, company.isApproved);

    return company;
  }

  public async remove(id: number, currentUser: UserPayload): Promise<void> {
    await this.readOneAdmin(id);

    await prisma.company.delete({
      where: {
        id,
        userId: currentUser.id
      }
    });
  }
}

export const companyService: CompanyService = new CompanyService();
