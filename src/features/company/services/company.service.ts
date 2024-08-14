import { Company } from '@prisma/client';
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
}

export const companyService: CompanyService = new CompanyService();
