import { createClient } from 'redis';

const client = createClient({
  url: 'redis://localhost:6380'
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

async function testRedis() {
  await client.set('key', 'hello redis'); // SET key "hello redis"
  const value = await client.get('key');
  console.log('value in redis', value);
}

testRedis();

export default client;
