import 'dotenv/config';
// import { appGrpcMicroservice } from '@app/app.grpc';
// import { appKafkaMicroservice } from '@app/app.kafka';
import { appGrpcMicroservice } from '@app/app.grpc';
import { AppModule } from '@app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import { GrpcOptions, KafkaOptions } from '@nestjs/microservices';
// import { sendgridClient } from '@shared/vendors/sendgrid/sendgrid.client';
// import { datasource } from '@shared/vendors/typeorm/postgres/datasource';
import { GrpcOptions } from '@nestjs/microservices';
import { datasource } from '@shared/vendors/typeorm/postgres/datasource';
import { Configs } from './configs';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix(Configs.app.globalPrefix);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    // app.connectMicroservice<KafkaOptions>(appKafkaMicroservice);
    app.connectMicroservice<GrpcOptions>(appGrpcMicroservice);

    // sendgridClient.initialize();

    if (!datasource.isInitialized) {
        await datasource.initialize();
    }

    await app.startAllMicroservices();
    await app.listen(Configs.app.httpPort);
}

bootstrap();
