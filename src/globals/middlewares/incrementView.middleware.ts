import { NextFunction, Request, Response } from 'express';

export function incrementView(
  getRedisKey: (id: string) => string,
  getRedisViewKey: (id: string) => string,
  checkUserInSet: (redisViewKey: string, userId: number) => Promise<boolean>,
  incrementRedisView: (redisKey: string) => Promise<void>,
  addUserToSet: (redisViewKey: string, userId: number) => Promise<void>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const currentUser = req.currentUser;
    const redisKey = getRedisKey(req.params.id);
    const redisViewKey = getRedisViewKey(req.params.id);

    console.log({ redisKey, redisViewKey });

    try {
      if (currentUser) {
        const isUserInSet = await checkUserInSet(redisViewKey, currentUser.id);

        console.log({ isUserInSet });

        if (!isUserInSet) {
          await incrementRedisView(redisKey);
          await addUserToSet(redisViewKey, currentUser.id);
        }
      }
    } catch (error) {
      console.log('Error when increment view', error);
    }

    return next();
  };
}
