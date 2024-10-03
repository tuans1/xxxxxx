import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import {
    KafkaOptions,
    MicroserviceOptions,
    Transport
} from '@nestjs/microservices';
import { options as kafkaOptions } from '@shared/vendors/kafka/kafka.options';
import { sendgridClient } from '@shared/vendors/sendgrid/sendgrid.client';
import { datasource } from '@shared/vendors/typeorm/postgres/datasource';
import { AppModule } from './app.module';
import { Configs } from './configs';
import { grpcClientOptions } from './grpc-client.options';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix(Configs.app.globalPrefix);

    app.connectMicroservice<KafkaOptions>({
        transport: Transport.KAFKA,
        options: kafkaOptions
    });
    app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

    sendgridClient.initialize();

    if (!datasource.isInitialized) {
        await datasource.initialize();
    }

    await app.startAllMicroservices();
    await app.listen(Configs.app.httpPort);
}

bootstrap();
