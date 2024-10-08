import { HttpModule as CarrierHttpModule } from '@modules/carrier/presentation/http/http.module';
import { Module } from '@nestjs/common';
import { MdmModule } from '@shared/chorus/mdm/mdm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [MdmModule, CarrierHttpModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
