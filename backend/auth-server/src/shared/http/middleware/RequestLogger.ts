import { Request, Response, NextFunction } from 'express';
import EventEmitter from 'events';
import Pino from 'src/shared/util/Pino';
export class ExecutionController {

    public profiles: EventEmitter;

    private static instance: ExecutionController;
    private constructor() {
        this.profiles = new EventEmitter();
        this.profiles.on('route', ({ request, duration }) => {
            Pino.info(`END: [${duration}] ${request.method} ${request.originalUrl}`);
        });
    }

    public static getInstance(): ExecutionController{
        if (!this.instance) {
            this.instance = new ExecutionController();
        }
        return this.instance;
    }
}

export default async function requestLogger(request: Request, response: Response, next: NextFunction) {
    const start = Date.now();
    request.once('end', () => {
        ExecutionController.getInstance().profiles.emit('route', { request, duration: Date.now() - start });
    });
    Pino.info(`START: ${request.method} ${request.originalUrl}`);
    next();
}
