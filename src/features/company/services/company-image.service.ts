import prisma from '~/prisma';
import { companyService } from './company.service';
import { CompanyImage } from '@prisma/client';
import { deleteImage } from '~/globals/helpers/upload.helper';
import { NotFoundException } from '~/globals/cores/error.core';

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

  private async findOne(companyId: number, companyImageId: number) {
    const companyImage = await prisma.companyImage.findFirst({
      where: { companyId, id: companyImageId }
    });

    if (!companyImage) throw new NotFoundException('Cannot find image');

    return companyImage;
  }

  public async remove(companyId: number, currentUser: UserPayload, companyImageId: number) {
    const company = await companyService.findOne(companyId, currentUser.id);
    const image = await this.findOne(companyId, companyImageId);

    await deleteImage(image.imageUrl);

    await prisma.companyImage.delete({
      where: { id: companyImageId, companyId: company.id }
    });
  }
}

export const companyImageService: CompanyImageService = new CompanyImageService();
