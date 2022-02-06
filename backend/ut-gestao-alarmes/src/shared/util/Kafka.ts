import { KafkaClient, Producer, Consumer, ConsumerOptions, OffsetFetchRequest } from 'kafka-node';

export default class Kafka {
  private kafkaHost: string;
  private kafkaClient: KafkaClient;
  private kafkaProducer: Producer;

  constructor(kafkaHost: string) {
    this.kafkaHost = kafkaHost;
  }

  public connect(): KafkaClient {
    if (!this.kafkaClient) {
      this.kafkaClient = new KafkaClient({ kafkaHost: this.kafkaHost });
    }

    return this.kafkaClient;
  }

  public createProducer(): Producer {
    this.kafkaProducer = new Producer(this.kafkaClient);

    return this.kafkaProducer;
  }

  public async createConsumer(
    topics: (string | OffsetFetchRequest)[],
    options: ConsumerOptions
  ): Promise<Consumer> {
    let consumerKafka = new Consumer(this.kafkaClient, topics, options);

    return consumerKafka;
  }
}