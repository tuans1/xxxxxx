import { CarrierModule } from '@modules/carrier/carrier.module';
import { ServiceLaneModule } from '@modules/service_lane/service_lane.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MdmModule } from '@shared/vendors/chorus/mdm/mdm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        CqrsModule.forRoot(),
        MdmModule,
        CarrierModule,
        ServiceLaneModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
