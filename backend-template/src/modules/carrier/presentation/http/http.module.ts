import { Module } from '@nestjs/common';
import { CarrierController } from './controllers/carrier.controller';

@Module({
    controllers: [CarrierController]
})
export class HttpModule {}
