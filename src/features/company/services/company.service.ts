import { Company, Prisma } from '@prisma/client';
import { NotFoundException } from '~/globals/cores/error.core';
import { getPaginationAndFilters } from '~/globals/helpers/pagination-filter.helper';
import prisma from '~/prisma';

class CompanyService {
  public async create(requestBody: any, currentUser: UserPayload): Promise<Company> {
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
    const companies = await prisma.company.findMany();

    return companies;
  }

  public async readAllPagination({ page, limit, filter }: any) {
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
    // const companies = await prisma.company.findMany({
    //   where: {
    //     userId: currentUser.id
    //   }
    // });

    // return companies;

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

  public async readOne(id: number): Promise<Company> {
    const company = await prisma.company.findUnique({
      where: { id }
    });

    if (!company) throw new NotFoundException(`Cannot find company with id: ${id}`);

    return company;
  }

  private async findOne(companyId: number, userId: number): Promise<Company> {
    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
        userId
      }
    });

    if (!company) throw new NotFoundException(`Cannot find company ${companyId} of user ${userId}`);

    return company;
  }

  public async update(id: number, requestBody: any, currentUser: UserPayload) {
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

    return company;
  }
}

export const companyService: CompanyService = new CompanyService();
