import RedisKey from '~/globals/constants/redis-keys.constaint';
import { excludeFields } from '~/globals/helpers/excludeFields.helper';
import RedisClient from './redis.client';
import { User } from '@prisma/client';

const redisClient = new RedisClient();

class UserRedis {
  public async getUserFromRedis(userKey: string) {
    const userCached = await redisClient.client.hGetAll(userKey);
    // 2) If user 1 exist in redis, return it
    if (Object.keys(userCached).length > 0) {
      console.log('go to redis');
      const dataFromRedis = {
        id: parseInt(userKey.split(':')[1]),
        name: userCached.name!,
        email: userCached.email,
        password: userCached.password,
        role: userCached.role,
        status: userCached.status === 'true' ? true : false
      };

      return excludeFields(dataFromRedis, ['password']);
    }

    return null;
  }

  public async saveUserToRedis(userKey: string, user: User) {
    const dataToRedis = {
      name: user.name!,
      email: user.email,
      password: user.password,
      role: user.role,
      status: user.status ? 'true' : 'false'
    };

    for (const [field, value] of Object.entries(dataToRedis)) {
      await redisClient.client.hSet(userKey, field, value);
    }
  }

  public async updateNameToRedis(userKey: string, name: string) {
    await redisClient.client.hSet(userKey, 'name', name);
  }

  public async updatePasswordToRedis(userKey: string, password: string) {
    await redisClient.client.hSet(userKey, 'password', password);
  }

  public async updateStatusToRedis(userKey: string, status: boolean) {
    await redisClient.client.hSet(userKey, 'status', status ? 'true' : 'false');
  }
}

export const userRedis: UserRedis = new UserRedis();
