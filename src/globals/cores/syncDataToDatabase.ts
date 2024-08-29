import prisma from '~/prisma';
import RedisKey from '../constants/redis-keys.constaint';
import RedisClient from './redis/redis.client';

const redisClient = new RedisClient();
export async function syncDataToDatabase() {
  // Get all key start with "company_views:"

  const keys = await redisClient.client.keys('company_views:*');

  // ["company_views:1", "company_views:2", "company_views:3"]

  for (const key of keys) {
    const companyId = parseInt(key.split(':')[1]);
    // companyId: 1
    // Look to hash companies:1
    const viewsString = await redisClient.client.hGet(`${RedisKey.COMPANiES_KEY}:${companyId}`, 'views');
    // Get the views field => string
    // Convert it to number
    if (viewsString) {
      const views = parseInt(viewsString);
      // Update into a postgres database

      await prisma.company.update({
        where: { id: companyId },
        data: {
          views
        }
      });
    }
  }

  console.log('Sync views to company successfully!');
}
