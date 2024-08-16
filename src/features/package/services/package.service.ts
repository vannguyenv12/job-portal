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

  public async readAll(where = {}): Promise<Package[]> {
    const packages = await prisma.package.findMany(where);

    return packages;
  }

  public async readOne(id: number, where: any = {}): Promise<Package> {
    const packageEntity = await prisma.package.findUnique({
      where: { id, isActive: where.isActive }
    });

    if (!packageEntity) throw new NotFoundException(`Package: ${id} not found`);

    return packageEntity;
  }

  public async update(id: number, requestBody: any): Promise<Package> {
    const { label, price, jobPostLimit } = requestBody;

    await this.readOne(id);

    const packageEntity = await prisma.package.update({
      where: { id },
      data: {
        label,
        price,
        jobPostLimit
      }
    });

    return packageEntity;
  }

  public async updateActive(id: number, isActive: boolean): Promise<Package> {
    await this.readOne(id);
    const packageEntity = await prisma.package.update({
      where: { id },
      data: {
        isActive
      }
    });

    return packageEntity;
  }
}

export const packageService: PackageService = new PackageService();
