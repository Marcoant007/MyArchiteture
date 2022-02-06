import { Consumer, OffsetFetchRequest } from 'kafka-node';
import alarmController from './AlarmController';
import eventController from './EventController';
import config from '../../../../../shared/config/config';
import Pino from '../../../../../shared/util/Pino';

export default class KafkaController {
  public options = {
    "enable.auto.commit": false,
    "auto.commit.interval.ms": 1,
    "auto.offset.reset": "latest"
  };

  public topics: OffsetFetchRequest[] = [
    { topic: 'create-event' },
    { topic: 'create-alarm' },
  ];

  private kafkaConsumer: Consumer;


  private processMessageStrategy = {
    'create-event': this.createEvent,
    'create-alarm': this.createAlarm,
  }

  addConsumer(kafkaConsumer: Consumer) {
    this.kafkaConsumer = kafkaConsumer;
  }

  public async message(message: any) {
    Pino.info("UT Alarmes: Mensagem recebida");
    Pino.info(message);

    await this.processMessageStrategy[message.topic](message.topic, JSON.parse(message.value));

    this.kafkaConsumer.commit((error, data) => {
      if (error) {
        Pino.info(`UT Alarmes: Ocorreu um erro ao tentar processar a mensagem no topico`);
        Pino.error(error);
      } else {
        Pino.info(`UT Alarmes: Commit success`);
        Pino.debug(data)
      }
    });
  }

  private async createEvent(topic, message) {
    await eventController.create(message);
  }

  private async createAlarm(topic, message) {
    await alarmController.create(message);
  }
}