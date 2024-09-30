import { ClientsModule, Transport } from '@nestjs/microservices';
import { options } from './kafka.options';

export const KafkaModuleSymbol = Symbol('KAFKA_CLIENT_MODULE');

export const KafkaModule = ClientsModule.register([
    { name: KafkaModuleSymbol, transport: Transport.KAFKA, options }
]);
