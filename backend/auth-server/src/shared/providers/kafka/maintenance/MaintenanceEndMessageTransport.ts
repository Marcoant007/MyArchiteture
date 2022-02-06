import TYPES from "@types";
import Pino from "@util/Pino";
import { response } from "express";
import { inject, injectable } from "inversify";
import { Producer } from "kafka-node";
import IMessageProvider, { IMesageRequest } from "../IMessageProvider";

let then;

@injectable()
export class MaintenanceEndMessageTransport implements IMesageRequest {
    
    // Producer
    private producer: Producer;
    private topic: string = "manual-close";

    // request
    private _resolve;
    private _reject;
    private key: string;

    private endMessage: EndMaintenanceMessage ;

    constructor(
        @inject(TYPES.IMessageProvider)
        private readonly messageProvider: IMessageProvider
    ) {
        then = this;
    }

    public resolve(data: any) {
        let key = this.endMessage.machineCode + this.endMessage.sequence;
        this.messageProvider.removeSessionRequest(key);
        this._resolve(data);
    }
    
    public reject(data: any) {
        let key = this.endMessage.machineCode + this.endMessage.sequence;
        this.messageProvider.removeSessionRequest(key);
        this._reject(data);
    }

    public async sendEndMessage(endMessage: EndMaintenanceMessage) {
        this.producer = await this.messageProvider.createProducer();
        this.endMessage = endMessage;
  
        this.key = endMessage.machineCode + endMessage.sequence;

        let result = await this.sendMessage(this.endMessage);

        if (!result) {
            return result;
        }

    }

    private async sendMessage(message: EndMaintenanceMessage): Promise<boolean> {
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
                Pino.error(`Erro ao tentar enviar commando de finalizar manutenação (${payloads[0].topic}) status = [${err}]`);
                return
            }
            resolve(true);
            Pino.info(`Commando enviado para a maquina (${payloads[0].topic}) com sucesso`);
        });
    }
}

export class EndMaintenanceMessage {
    machineCode: string;
    sequence: number;

    constructor(machineCode, sequence){
        this.machineCode = machineCode;
        this.sequence = sequence;
    }
}