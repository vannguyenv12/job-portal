import { NextFunction, Request, Response } from 'express';
import prisma from '~/prisma';
import { ForbiddenException } from '../cores/error.core';

// export async function checkPermission(req: Request, res: Response, next: NextFunction) {
//   const userId = req.currentUser.id;
//   const userRole = req.currentUser.role;
//   const candidateId = parseInt(req.params.id);

//   try {
//     const candidateProfile = await prisma.candidateProfile.findUnique({
//       where: { id: candidateId }
//     });

//     if (userRole === 'ADMIN' || userRole === 'RECRUITER' || userId === candidateProfile?.userId) {
//       return next();
//     }

//     return next(new ForbiddenException(`You don't have permission to access`));
//   } catch (error) {
//     next(error);
//   }
// }

export function checkPermission(model: any, foreignField: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.currentUser.id;
    const userRole = req.currentUser.role;
    const entityId = parseInt(req.params.id);

    try {
      const entity = await (prisma[model] as any).findUnique({
        where: { id: entityId }
      });

      if (userRole === 'ADMIN' || userRole === 'RECRUITER' || userId === entity[foreignField]) {
        return next();
      }

      return next(new ForbiddenException(`You don't have permission to access`));
    } catch (error) {
      next(error);
    }
  };
}
