import 'dotenv/config';
import { AppModule } from '@app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Configs } from './configs';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix(Configs.app.globalPrefix);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.listen(Configs.app.httpPort);
}

bootstrap();
