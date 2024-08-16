import { Package } from '@prisma/client';
import { NotFoundException } from '~/globals/cores/error.core';
import prisma from '~/prisma';

class PackageService {
  public async create(requestBody: any) {
    const { label, price, jobPostLimit } = requestBody;

    const packageEntity = await prisma.package.create({
      data: {
        label,
        price,
        jobPostLimit
      }
    });

    return packageEntity;
  }

  public async readAll(): Promise<Package[]> {
    const packages = await prisma.package.findMany();

    return packages;
  }

  public async readOne(id: number): Promise<Package> {
    const packageEntity = await prisma.package.findUnique({
      where: { id }
    });

    if (!packageEntity) throw new NotFoundException(`Package: ${id} not found`);

    return packageEntity;
  }
}

export const packageService: PackageService = new PackageService();
