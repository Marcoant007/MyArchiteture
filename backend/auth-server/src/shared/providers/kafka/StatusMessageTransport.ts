import TYPES from "@types";
import Pino from "@util/Pino";
import { inject, injectable } from "inversify";
import { Producer } from "kafka-node";
import IMessageProvider, { IMesageRequest } from "./IMessageProvider";
import { PositionResponseStatusEnum } from "./StatusMessageConsumer";

let then;

@injectable()
export class StatusMessageTransport implements IMesageRequest {
    
    // Producer
    private producer: Producer;
    private topic: string = "status-position-send";

    // request
    private _resolve;
    private _reject;
    private timer: number = 5000;
    private key: string;

    private machineMessage: MachineMessage ;

    constructor(
        @inject(TYPES.IMessageProvider)
        private readonly messageProvider: IMessageProvider
    ) {
        then = this;
    }

    public resolve(data: any) {
        let key = this.machineMessage.machineCode + this.machineMessage.sequence;
        this.messageProvider.removeSessionRequest(key);
        this._resolve(data);
    }
    
    public reject(data: any) {
        let key = this.machineMessage.machineCode + this.machineMessage.sequence;
        this.messageProvider.removeSessionRequest(key);
        this._reject(data);
    }

    public async sendStatus(machineCode, sequence): Promise<PositionResponseStatusEnum> {
        this.producer = await this.messageProvider.createProducer();
        this.machineMessage = new MachineMessage(machineCode, sequence);
        let then = this;

        this.key = machineCode + sequence;
        //Adiciona a mensagem em uma fila até que ela seja respondida
        this.messageProvider.addSessionRequest(this.key, this);

        let result = await this.sendMessage(this.machineMessage);

        if (!result) {
            return PositionResponseStatusEnum.Desligada;
        }

        let promisse = new Promise<PositionResponseStatusEnum>(function (resolve, reject) {
            then._resolve = resolve;
            then._reject = reject;
            setTimeout(() => {
                reject(PositionResponseStatusEnum.Desligada);
            }, then.timer);
        });

        return await promisse;
    }

    private async sendMessage(message: MachineMessage): Promise<boolean> {
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
                Pino.error(`Erro ao tentar enviar commando de versão (${payloads[0].topic}) status = [${err}]`);
                resolve(false);
                return
            }
            Pino.info(`Commando enviado para o version Controller(${payloads[0].topic}) com sucesso`);
            resolve(true);
        });
    }
}

export class MachineMessage {
    machineCode: string;
    sequence: number;

    constructor(machineCode, sequence){
        this.machineCode = machineCode;
        this.sequence = sequence;
    }
}