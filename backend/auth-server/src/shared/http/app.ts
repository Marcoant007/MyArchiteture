import 'reflect-metadata';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import config from '../config/Config';
import requestLogger from './middleware/RequestLogger';
import { Container } from 'inversify';
import { bindings } from '@container';
import { InversifyExpressServer } from "inversify-express-utils";
import { setInfoRequest } from './middleware/SetInfoRequest';
export class App {
    public express: express.Application;
    public usePino = false;

    private middlewares(app): void {
        app.use(cors());
        app.use(express.json());
        app.use(requestLogger);
        if (this.usePino) {
            this.express.use((pino()));
        }
        app.use(setInfoRequest);
    }

    public async configure() { 
        
        const container = new Container();
        await container.loadAsync(bindings);
        const inversify = new InversifyExpressServer(container);
        

        inversify.setConfig((app) => {
            this.middlewares(app);
        });
        this.express = inversify.build();
        this.express.set('port', config.port);
    }
}

export default new App();
