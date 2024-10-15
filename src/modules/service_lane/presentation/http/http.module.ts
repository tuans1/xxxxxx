import { Module } from '@nestjs/common';
import { ServiceLaneController } from './controllers/sl.controller';

@Module({
    controllers: [ServiceLaneController]
})
export class HttpModule {}
