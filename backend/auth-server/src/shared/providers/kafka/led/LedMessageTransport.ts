import TYPES from "@types";
import Pino from "@util/Pino";
import { response } from "express";
import { inject, injectable } from "inversify";
import { Producer } from "kafka-node";
import IMessageProvider, { IMesageRequest } from "../IMessageProvider";

let then;

@injectable()
export class LedMessageTransport implements IMesageRequest {
    
    // Producer
    private producer: Producer;
    private topic: string = "led-command-send";

    // request
    private _resolve;
    private _reject;
    private key: string;

    private ledMessage: LedMessage ;

    constructor(
        @inject(TYPES.IMessageProvider)
        private readonly messageProvider: IMessageProvider
    ) {
        then = this;
    }

    public resolve(data: any) {
        let key = this.ledMessage.machineCode + this.ledMessage.sequence;
        this.messageProvider.removeSessionRequest(key);
        this._resolve(data);
    }
    
    public reject(data: any) {
        let key = this.ledMessage.machineCode + this.ledMessage.sequence;
        this.messageProvider.removeSessionRequest(key);
        this._reject(data);
    }

    public async sendLedColor(ledMessage: LedMessage) {
        this.producer = await this.messageProvider.createProducer();
        this.ledMessage = ledMessage;
  
        this.key = ledMessage.machineCode + ledMessage.sequence;

        let result = await this.sendMessage(this.ledMessage);

        if (!result) {
            return result;
        }

    }

    private async sendMessage(message: LedMessage): Promise<boolean> {
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
                Pino.error(`Erro ao tentar enviar commando de cor do led (${payloads[0].topic}) status = [${err}]`);
                return
            }
            resolve(true);
            Pino.info(`Commando enviado para a maquin (${payloads[0].topic}) com sucesso`);
        });
    }
}

export class LedMessage {
    machineCode: string;
    sequence: number;
    colorHex: string;
    timer: number;

    constructor(machineCode, sequence, color, timer){
        this.machineCode = machineCode;
        this.sequence = sequence;
        this.colorHex = color;
        this.timer = timer;
    }
}