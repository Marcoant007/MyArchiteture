import { App } from "@app";
import { TransactionStatusEnum } from "@models/TransactionStatusEnum";
import TYPES from "@types";
import IRefoundUseCase from "@useCases/refound/IRefoundUseCase";
import Pino from "@util/Pino";
import { Container, inject, injectable } from "inversify";
import { Consumer } from "kafka-node";
import IMessageProvider, { IMesageRequest } from "../IMessageProvider";

let then;

@injectable()
export class RefoundReceivedMessageConsumer {

    // Consumer
    private consumer: Consumer;
    topics = [{ topic: 'request-refound' }];
    options = {
        autoCommit : true,
        autoCommitIntervalMs : 5000,
    };

    constructor(
        @inject(TYPES.IMessageProvider)
        private readonly messageProvider: IMessageProvider
    ) {
        then = this;
    }
    
    public async register() {
        if (!this.consumer) {
            this.consumer = await this.messageProvider.createConsumer(this.topics, this.options);
            this.consumer.on('message', this.message);
        }
    }

    private async message(message) {
        try {
            Pino.info("[PDV] RefoundReceivedMessage: Mensagem recebida");

            let refoundMessage: RefoundMessage = JSON.parse(message.value);
    
            let container : Container = App.instance.container;
    
            let refoundUseCase: IRefoundUseCase = container.get(TYPES.RefoundUseCase);
    
            await refoundUseCase.execute(refoundMessage);

            then.consumer.commit((error, data) => {
                if (error) {
                    Pino.info(`[PDV] Erro ao commitar mensagem`);
                    Pino.error(error);
                } else {
                    Pino.info(`[PDV] Commitado com sucesso`);
                    Pino.debug(data)
                }
            });
        } catch (error) {
            Pino.error("ocoreu um erro ao receber mensagem de refound");
            Pino.error(error);
        }
    }
}

export class RefoundMessage {
    saleId: number;
    organizationId: number;
}
