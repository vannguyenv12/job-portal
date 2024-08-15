import prisma from '~/prisma';
import { companyService } from './company.service';
import { NotFoundException } from '~/globals/cores/error.core';

class CompanyIndustryService {
  public async add(companyId: number, industryName: string, currentUser: UserPayload) {
    await companyService.findOne(companyId, currentUser.id);
    await this.findIndustry(industryName);

    const companyIndustry = await prisma.companyIndustry.create({
      data: {
        companyId,
        industryName
      }
    });

    return companyIndustry;
  }

  private async findIndustry(industryName: string) {
    const industry = await prisma.industry.findUnique({
      where: { name: industryName }
    });

    if (!industry) throw new NotFoundException(`Industry: ${industryName} not found`);

    return industry;
  }
}

export const companyIndustryService: CompanyIndustryService = new CompanyIndustryService();
