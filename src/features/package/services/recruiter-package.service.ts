import { orderService } from '~/features/order/services/order.service';
import { BadRequestException, NotFoundException } from '~/globals/cores/error.core';
import prisma from '~/prisma';
import { packageService } from './package.service';

class RecruiterPackageService {
  public async create(packageId: number, currentUser: UserPayload) {
    const startDate = new Date(Date.now());
    const clonedStartDate = new Date(Date.now());
    const endDate = new Date(clonedStartDate.setMonth(clonedStartDate.getMonth() + 1));

    // Throw error if recruiter package still exist
    const existPackage = await this.findOne(currentUser.id);

    // Get package active
    await packageService.readOne(packageId, { isActive: true });

    if (existPackage.endDate > new Date(Date.now())) {
      throw new BadRequestException('You cannot buy this package');
    }

    const recruiterPackage = await prisma.recruiterPackage.create({
      data: {
        packageId,
        recruiterId: currentUser.id,
        startDate,
        endDate
      }
    });

    // TODO: add to order table
    await orderService.create(packageId, currentUser);

    return recruiterPackage;
  }

  public async findOne(recruiterId: number) {
    const recruiterPackage = await prisma.recruiterPackage.findFirst({
      where: {
        recruiterId
      }
    });

    if (!recruiterPackage) throw new NotFoundException('Cannot find recruiter package of current user');

    return recruiterPackage;
  }
}

export const recruiterPackageService: RecruiterPackageService = new RecruiterPackageService();
