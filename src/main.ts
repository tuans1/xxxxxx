import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { datasource } from '@shared/vendors/typeorm/postgres/datasource';
import { AppModule } from './app.module';
import { Configs } from './configs';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix(Configs.app.globalPrefix);

    if (!datasource.isInitialized) {
        await datasource.initialize();
    }

    await app.listen(Configs.app.httpPort);
}

bootstrap();
