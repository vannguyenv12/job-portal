import prisma from '~/prisma';
import { companyService } from './company.service';
import { CompanyImage } from '@prisma/client';

class CompanyImageService {
  public async add(companyId: number, currentUser: UserPayload, files: Express.Multer.File[]) {
    const company = await companyService.findOne(companyId, currentUser.id);

    const data = [];
    for (const file of files) {
      data.push({ companyId: company.id, imageUrl: file.filename });
    }

    await prisma.companyImage.createMany({
      data
    });
  }

  public async readAll(companyId: number): Promise<CompanyImage[]> {
    const companyImages = await prisma.companyImage.findMany({
      where: { companyId }
    });

    return companyImages;
  }
}

export const companyImageService: CompanyImageService = new CompanyImageService();
