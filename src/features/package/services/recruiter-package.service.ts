import prisma from '~/prisma';

class RecruiterPackageService {
  public async create(packageId: number, currentUser: UserPayload) {
    const startDate = new Date(Date.now());
    const clonedStartDate = new Date(Date.now());
    const endDate = new Date(clonedStartDate.setMonth(clonedStartDate.getMonth() + 1));

    const recruiterPackage = await prisma.recruiterPackage.create({
      data: {
        packageId,
        recruiterId: currentUser.id,
        startDate,
        endDate
      }
    });

    return recruiterPackage;
  }
}

export const recruiterPackageService: RecruiterPackageService = new RecruiterPackageService();
