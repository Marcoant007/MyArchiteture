import { App } from "@app";
import { TransactionStatusEnum } from "@models/TransactionStatusEnum";
import TYPES from "@types";
import IAddCreditConfirmationConfirmationUseCase from "@useCases/credit/IAddCreditConfirmationConfirmationUseCase";
import Pino from "@util/Pino";
import { Container, inject, injectable } from "inversify";
import { Consumer } from "kafka-node";
import IMessageProvider, { IMesageRequest } from "../IMessageProvider";

let then;

@injectable()
export class PaymentAuthorizationConsumer {

    // Consumer
    private consumer: Consumer;
    topics = [{ topic: 'payment-authorization' }];
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
            Pino.info("[PDV] PaymentAuthorizationConsumer: Mensagem recebida");

            let paymentAuthorization: PaymentAuthorization = JSON.parse(message.value);
    
            let container : Container = App.instance.container;
    
            let addCreditConfirmationConfirmationUseCase: IAddCreditConfirmationConfirmationUseCase 
                = container.get(TYPES.AddCreditConfirmationConfirmationUseCase);
    
            await addCreditConfirmationConfirmationUseCase.execute(paymentAuthorization);

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

export class PaymentAuthorization {
    walletId: number;
    organizationId: number;
    status: TransactionStatusEnum;
    type: string;
}
