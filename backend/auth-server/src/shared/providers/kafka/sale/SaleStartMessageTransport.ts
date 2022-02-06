import Sale from "@models/Sale";
import TYPES from "@types";
import Pino from "@util/Pino";
import { inject, injectable } from "inversify";
import { Producer } from "kafka-node";
import IMessageProvider, { IMesageRequest } from "../IMessageProvider";

let then;

@injectable()
export class SaleStartMessageTransport implements IMesageRequest {
    
    // Producer
    private producer: Producer;
    private topic: string = "payment-authorized";

    // request
    private _resolve;
    private _reject;
    private key: string;

    private startMessage: StartSaleMessage ;

    constructor(
        @inject(TYPES.IMessageProvider)
        private readonly messageProvider: IMessageProvider
    ) {
        then = this;
    }

    public resolve(data: any) {
        let key = this.startMessage.machineCode + this.startMessage.sequence;
        this.messageProvider.removeSessionRequest(key);
        this._resolve(data);
    }
    
    public reject(data: any) {
        let key = this.startMessage.machineCode + this.startMessage.sequence;
        this.messageProvider.removeSessionRequest(key);
        this._reject(data);
    }

    public async sendStartMessage(startMessage: StartSaleMessage) {
        this.producer = await this.messageProvider.createProducer();
        this.startMessage = startMessage;
  
        this.key = startMessage.machineCode + startMessage.sequence;

        let result = await this.sendMessage(this.startMessage);

        if (!result) {
            return result;
        }

    }

    private async sendMessage(message: StartSaleMessage): Promise<boolean> {
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
                Pino.error(`Erro ao tentar enviar commando de inicio de manutenção (${payloads[0].topic}) status = [${err}]`);
                return
            }
            resolve(true);
            Pino.info(`Commando enviado para a maquin (${payloads[0].topic}) com sucesso`);
        });
    }
}

export class StartSaleMessage {
    sequence: number;
    positionCode: string;
    machineCode: string;
    organizationId: number;
    locationName: string;
    saleId: number;
    color: string;
    timer: number;
    quantity?: number;

    constructor(sale: Sale){
        this.sequence = sale.position.sequence;
        this.positionCode = sale.position.code;
        this.machineCode = sale.machine.uniqueCode;
        this.organizationId = sale.organization.id;
        this.locationName = sale.location.name;
        this.saleId = sale.id;
        this.quantity = sale.quantity;
    }
}