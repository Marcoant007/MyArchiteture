import config from '../../../../../shared/config/config';
import Kafka from '../../../../../shared/util/Kafka';
import KafkaController from '../controllers/KafkaController';
import Pino from '../../../../../shared/util/Pino';

let controller = new KafkaController();

export class KafkaRoutes {

  async start() {
    Pino.info(`Iniciando cliente Kafka ${config.kafka.server}:${config.kafka.port}`);
    const kafka = new Kafka(`${config.kafka.server}:${config.kafka.port}`);
    kafka.connect();

    const kafkaConsumer = await kafka.createConsumer(controller.topics, controller.options);

    controller.addConsumer(kafkaConsumer);

    kafkaConsumer.on('message', this.message);
  }

  message(message) {
    controller.message(message);
  }
}

export default new KafkaRoutes()
