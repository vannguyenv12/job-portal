import express, { Application } from 'express';
import 'dotenv/config';

class Server {
  private app: Application;

  constructor() {
    this.app = express();
  }

  public start(): void {
    this.setupMiddleware();
    this.setupRoutes();
    this.setupGlobalError();
    this.listenServer();
  }

  private setupMiddleware(): void {}

  private setupRoutes(): void {}

  private setupGlobalError(): void {}

  private listenServer() {
    const port = process.env.PORT || 5050;

    this.app.listen(port, () => {
      console.log(`Connected to server with port ${port}`);
    });
  }
}

export default Server;
