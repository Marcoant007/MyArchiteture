import TYPES from "@types";
import Pino from "@util/Pino";
import { inject, injectable } from "inversify";
import { Consumer } from "kafka-node";
import IMessageProvider, { IMesageRequest } from "./IMessageProvider";

let then;

@injectable()
export class StatusMessageConsumer {

    // Consumer
    private consumer: Consumer;
    topics = [{ topic: 'status-position-received' }];
    options = {
        "enable.auto.commit": false,
        "auto.commit.interval.ms": 1,
        "auto.offset.reset": "latest"
    };

    // request
    private resolve;
    private reject;

    constructor(
        @inject(TYPES.IMessageProvider)
        private readonly messageProvider: IMessageProvider
    ) {
        then = this;
    }
    
    public async register() {
        if (!this.consumer) {
            this.consumer = await this. messageProvider.createConsumer(this.topics, this.options);
            this.consumer.on('message', this.message);
        }
    }

    private async message(message) {
        Pino.info("[PDV] StatusController: Mensagem recebida");
        Pino.info(message);

        let machineResponse: MachineResponse = JSON.parse(message.value);

        let key = machineResponse.machineCode + machineResponse.sequence;

        let request: IMesageRequest = then.messageProvider.getSessionRequest(key);

        if (!request) {
            return;
        }

        if(request.resolve){
            then.consumer.commit((error, data) => {
                if (error) {
                    Pino.info(`[PDV] StatusPositionController: Ocorreu um erro ao tentar processar a mensagem no topico`);
                    Pino.error(error);
                } else {
                    Pino.info(`[PDV] StatusPositionController: Commit success`);
                    Pino.debug(data)
                }
            });
            request.resolve(machineResponse.status);
        }
    }
}

export class MachineResponse {
    machineCode: string;
    status: PositionResponseStatusEnum;
    sequence: any;
    status_type: any;
}

export enum PositionResponseStatusEnum {
    Fechada = "F",
    Aberta = "A",
    Desligada = ""
}