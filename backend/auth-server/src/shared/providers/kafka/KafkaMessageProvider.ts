import AppError from "@errors/AppError";
import Pino from "@util/Pino";
import { Consumer, KafkaClient, Producer } from "kafka-node";
import IMessageProvider, { IMesageRequest } from "./IMessageProvider";

export class KafkaMessageProvider implements IMessageProvider {

    private server: string = "kafka";
    private port: number = 29092;
    private client: KafkaClient;

    private ready: boolean = false;

    // Fila de requisições não respondidas
    private requestRepository: string [] = [];

    constructor() { }

    public setServer(server: string) {
        this.server = server;
    }

    public setPort(port: number) {
        this.port = port;
    }

    public async connect() {
        if (!this. server) {
            throw new AppError({
                title: "Servidor é obrigatório",
                message: "Não é possível conetar a um servidor o enderço"
            });
        }

        if (!this.port) {
            throw new AppError({
                title: "Porta é obrigatório",
                message: "Não é possível conetar a um servidor sem porta"
            });
        }

        if (this.client) {
            return;
        }

        this.client = new KafkaClient({
            kafkaHost: `${this.server}:${this.port}`
        });

        let then = this;
        
        this.client.on('close', () => {
            then.ready = false;
        });
        this.client.on('connect', () => {
            then.ready = true;
        });
        this.client.on('reconnect', () => {
            then.ready = true;
        });
        this.client.on('ready', () => {
            then.ready = true;
        });
    }


    public async createProducer() {
        if (!this.isConnected()) {
            await this.connect();
        }
        let producer = new Producer(this.client);
        return producer;
    }

    public async createConsumer(topics, options) {
        if (!this.isConnected()) {
           await this.connect();
        }
        let consumer =  new Consumer(this.client, topics, options);
        return consumer;
    }

    private isConnected(): boolean {
        return this.ready;
    }

    addSessionRequest(key: string, session: IMesageRequest) {
        this.requestRepository[key] = session;
    }

    getSessionRequest(key: string): IMesageRequest {
        return this.requestRepository[key];
    }

    removeSessionRequest(key: string): void{
        delete this.requestRepository[key];
    }
}