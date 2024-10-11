import { CarrierModule } from '@modules/carrier/carrier.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MdmModule } from '@shared/vendors/chorus/mdm/mdm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [CqrsModule.forRoot(), MdmModule, CarrierModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
