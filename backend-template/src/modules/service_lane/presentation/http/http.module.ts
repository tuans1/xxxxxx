import { Module } from '@nestjs/common';
import { ServiceLaneController } from '../grpc/controllers/service_lane/sl.controller';

@Module({
    controllers: [ServiceLaneController]
})
export class HttpModule {}
