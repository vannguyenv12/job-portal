import { Company, Prisma } from '@prisma/client';
import { NotFoundException } from '~/globals/cores/error.core';
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
    let skip: number = (page - 1) * limit;

    // SELECT * FROM User WHERE name LIKE %met%
    // OR

    const where = filter
      ? ({
          OR: [
            { name: { contains: filter, mode: 'insensitive' } },
            { description: { contains: filter, mode: 'insensitive' } }
          ]
        } as Prisma.CompanyWhereInput)
      : {};

    if (filter) {
      page = 1;
      skip = (page - 1) * limit;
    }

    const [companies, totalCounts] = await Promise.all([
      prisma.company.findMany({
        where,
        skip,
        take: limit
      }),
      prisma.company.count({
        where
      })
    ]);

    return { companies, totalCounts };
  }

  public async readMyCompanies(currentUser: UserPayload): Promise<Company[]> {
    const companies = await prisma.company.findMany({
      where: {
        userId: currentUser.id
      }
    });

    return companies;
  }

  public async readOne(id: number): Promise<Company> {
    const company = await prisma.company.findUnique({
      where: { id }
    });

    if (!company) throw new NotFoundException(`Cannot find company with id: ${id}`);

    return company;
  }
}

export const companyService: CompanyService = new CompanyService();
