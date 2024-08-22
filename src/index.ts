import client from './globals/cores/redis/redis.client';
import Server from './server';

class JobApplication {
  public run(): void {
    const server = new Server();

    server.start();
  }
}

client;

const jobApplication: JobApplication = new JobApplication();
jobApplication.run();
