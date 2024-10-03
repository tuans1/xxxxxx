import { Module } from '@nestjs/common';
import { MdmModule } from '@shared/chorus/mdm/mdm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [MdmModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
