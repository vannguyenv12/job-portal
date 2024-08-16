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
}

export const packageService: PackageService = new PackageService();
