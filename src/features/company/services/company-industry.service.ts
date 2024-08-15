import prisma from '~/prisma';
import { companyService } from './company.service';
import { NotFoundException } from '~/globals/cores/error.core';
import { CompanyIndustry } from '@prisma/client';

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

  public async read(companyId: number): Promise<CompanyIndustry[]> {
    const companyIndustries = await prisma.companyIndustry.findMany({
      where: { companyId }
    });

    return companyIndustries;
  }

  public async remove(companyId: number, industryName: string, currentUser: UserPayload) {
    await companyService.findOne(companyId, currentUser.id);
    await this.findIndustry(industryName);
    await this.findCompanyIndustry(companyId, industryName);

    await prisma.companyIndustry.delete({
      where: {
        companyId_industryName: {
          companyId,
          industryName
        }
      }
    });
  }

  private async findIndustry(industryName: string) {
    const industry = await prisma.industry.findUnique({
      where: { name: industryName }
    });

    if (!industry) throw new NotFoundException(`Industry: ${industryName} not found`);

    return industry;
  }

  private async findCompanyIndustry(companyId: number, industryName: string) {
    const companyIndustry = await prisma.companyIndustry.findUnique({
      where: {
        companyId_industryName: {
          companyId,
          industryName
        }
      }
    });

    if (!companyIndustry) throw new NotFoundException(`Company ${companyId} does not have industry: ${industryName}`);
  }
}

export const companyIndustryService: CompanyIndustryService = new CompanyIndustryService();
