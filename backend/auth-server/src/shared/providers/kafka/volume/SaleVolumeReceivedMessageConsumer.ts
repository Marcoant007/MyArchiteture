import { App } from "@app";
import { TransactionStatusEnum } from "@models/TransactionStatusEnum";
import TYPES from "@types";
import IUpdateWalletWithVolumeUseCase from "@useCases/credit/IUpdateWalletWithVolumeUseCase";
import IUpdateSaleVolumeUseCase from "@useCases/sale/IUpdateSaleVolumeUseCase";
import Pino from "@util/Pino";
import { Container, inject, injectable } from "inversify";
import { Consumer } from "kafka-node";
import IMessageProvider, { IMesageRequest } from "../IMessageProvider";

let then;

@injectable()
export class SaleVolumeReceivedMessageConsumer {

    // Consumer
    private consumer: Consumer;
    topics = [{ topic: 'sale-volume-received' }];
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
            Pino.info("[PDV] SaleVolumeReceivedMessageConsumer: Mensagem recebida");

            let volumeReceived: SaleVolumeReceived = JSON.parse(message.value);
    
            let container : Container = App.instance.container;
    
            let updateSaleVolumeUseCase: IUpdateSaleVolumeUseCase 
                = container.get(TYPES.UpdateSaleVolumeUseCase);
            setTimeout(async () => {
                await updateSaleVolumeUseCase.execute(volumeReceived);
            }, 1000);

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
            Pino.error("ocoreu um erro ao receber mensagem de autorização de pagamento");
            Pino.error(error);
        }
    }
}

export class SaleVolumeReceived {
    machineCode: string;
    sequence: number;
    quantity: number;
    saleId: number;
}
