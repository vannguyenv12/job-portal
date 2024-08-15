import { Prisma } from '@prisma/client';
import prisma from '~/prisma';

export async function getPaginationAndFilters({ page, limit, filter, filterFields, entity, additionalCondition }: any) {
  const skip: number = (page - 1) * limit;

  const conditions = filterFields.map((field: string) => {
    return { [field]: { contains: filter, mode: 'insensitive' } };
  });

  const where = filter
    ? {
        OR: conditions
      }
    : {};

  const [data, totalCounts] = await Promise.all([
    (prisma[entity] as any).findMany({
      where: { ...where, ...additionalCondition },
      skip,
      take: limit
    }),
    (prisma[entity] as any).count({
      where: { ...where, ...additionalCondition }
    })
  ]);

  console.log({ ...where, ...additionalCondition });

  return { data, totalCounts };
}
