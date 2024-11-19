import { Module } from '@nestjs/common';
import { ServiceLaneController } from './controllers/service_lane/sl.controller';

@Module({
    controllers: [ServiceLaneController]
})
export class GrpcModule {}
