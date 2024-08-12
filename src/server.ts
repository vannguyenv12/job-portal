import express, { Application, NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import appRoutes from './globals/routes/appRoutes';
import { CustomError } from './globals/cores/error.core';
import HTTP_STATUS from './globals/constants/http.constant';

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

  private setupMiddleware(): void {
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    appRoutes(this.app); // /users, /jobs
  }

  private setupGlobalError(): void {
    this.app.all('*', (req, res, next) => {
      return res.status(404).json({
        message: `The URL ${req.originalUrl} not found with method ${req.method}`
      });
    });

    // next(new BadRequestException('asdasdads'))

    // Global Error => error, req, res, next
    this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
          message: error.message
        });
      }
    });
  }

  private listenServer() {
    const port = process.env.PORT || 5050;

    this.app.listen(port, () => {
      console.log(`Connected to server with port ${port}`);
    });
  }
}

export default Server;
