import { KafkaOptions } from '@nestjs/microservices';
import { SASLOptions } from '@nestjs/microservices/external/kafka.interface';
import { Configs } from '@src/configs';

const sasl: SASLOptions | undefined =
    Configs.kafka.mechanism === 'NONE'
        ? undefined
        : ({
              mechanism: Configs.kafka.mechanism,
              username: Configs.kafka.username,
              password: Configs.kafka.password
          } as SASLOptions);

export const options: KafkaOptions['options'] = {
    client: {
        clientId: Configs.kafka.clientId,
        brokers: Configs.kafka.brokers,
        ssl: Configs.kafka.ssl,
        sasl: sasl,
        requestTimeout: Configs.kafka.requestTimeout
    },
    consumer: {
        groupId: Configs.kafka.consumerGroupId
    }
};
