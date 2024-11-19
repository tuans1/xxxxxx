import { KafkaOptions, Transport } from '@nestjs/microservices';
import { SASLOptions } from 'kafkajs';
import { Configs } from '@src/configs';

export const appKafkaOptions: KafkaOptions['options'] = {
    client: {
        clientId: Configs.kafka.clientId,
        brokers: Configs.kafka.brokers,
        ssl: Configs.kafka.ssl,
        sasl:
            Configs.kafka.mechanism === 'NONE'
                ? undefined
                : ({
                      mechanism: Configs.kafka.mechanism,
                      username: Configs.kafka.username,
                      password: Configs.kafka.password
                  } as SASLOptions),
        requestTimeout: Configs.kafka.requestTimeout
    },
    consumer: {
        groupId: Configs.kafka.consumerGroupId
    }
};

export const appKafkaMicroservice: KafkaOptions = {
    transport: Transport.KAFKA,
    options: appKafkaOptions
};
