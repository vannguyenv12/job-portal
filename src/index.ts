import Server from './server';

class JobApplication {
  public run(): void {
    const server = new Server();

    server.start();
  }
}

const jobApplication: JobApplication = new JobApplication();
jobApplication.run();
