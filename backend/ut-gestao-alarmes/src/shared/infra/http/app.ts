import 'reflect-metadata'
import express from 'express';
import pino from 'pino-http'
import bodyParser from 'body-parser';
import cors from 'cors';
import config from '../../config/config';
import route from './routes';
import setInfoRequest from './middlewares/setInfoRequest';

export class App {
  public express: express.Application

  public usePino = false;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.configs();
  }

  private middlewares(): void {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use(setInfoRequest);
    if (this.usePino) {
      this.express.use((pino()));
    }
  }

  private routes(): void {
    this.express.use(route);
    this.express.use(cors());
    this.express.use(express.json());


  }

  private configs(): void {
    this.express.set('port', config.port);
  }
}

export default new App().express;
