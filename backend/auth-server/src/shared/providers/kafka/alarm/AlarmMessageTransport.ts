import TYPES from "@types";
import Pino from "@util/Pino";
import { response } from "express";
import { inject, injectable } from "inversify";
import { Producer } from "kafka-node";
import IMessageProvider, { IMesageRequest } from "../IMessageProvider";

let then;

@injectable()
export class AlarmMessageTransport implements IMesageRequest {
    
    // Producer
    private producer: Producer;
    private topic: string = "create-alarm";

    // request
    private _resolve;
    private _reject;


    constructor(
        @inject(TYPES.IMessageProvider)
        private readonly messageProvider: IMessageProvider
    ) {
        then = this;
    }

    public resolve(data: any) {
        this._resolve(data);
    }
    
    public reject(data: any) {
        this._reject(data);
    }

    public async sendAlarm(alarmMessage: AlarmMessage) {
        this.producer = await this.messageProvider.createProducer();
        let result = await this.sendMessage(alarmMessage);

        if (!result) {
            return result;
        }

    }

    private async sendMessage(message: AlarmMessage): Promise<boolean> {
        let payload = [
            { topic: this.topic, messages: JSON.stringify(message), partition: 0 },
        ];

        let promisse = new Promise<boolean>((resolve, reject) => {
            this.sendPayload(payload, resolve, reject);
        });

       let result = await promisse;

       return result;
    }

    private sendPayload(payloads, resolve, reject) {
        this.producer.send(payloads, function (err, data) {
            if (err) {
                reject(true);
                Pino.error(`Erro ao enviar comando (${payloads[0].topic}) status = [${err}]`);
                return
            }
            resolve(true);
            Pino.info(`Commando enviado para a tópico (${payloads[0].topic}) com sucesso`);
        });
    }
}

export class AlarmMessage {
    event: EventMessage;

    constructor(event: EventMessage){
        this.event = new EventMessage(event.name, 
            event.level, 
            event.category, 
            event.origin, 
            event.description,
            event.organizationId); 
    }
}

export class EventMessage {
    name: string;
    level: string;
    category: string;
    origin: string;
    description: string;
    organizationId?: number;
    
    constructor(name, level, category, origin, description, organizationId?){
        this.name = name;
        this.level = level;
        this.category = category;
        this.origin = origin;
        this.description = description;
        this.organizationId = organizationId;
    }
}