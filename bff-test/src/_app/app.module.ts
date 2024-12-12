import { Module } from '@nestjs/common';
import { MdmModule } from '@shared/vendors/chorus/mdm/mdm.module';
import { VsmModule } from '@shared/vendors/chorus/vsm/vsm.module';
import { AppController } from './app.controller';
import { AppGraphQlModule, GraphQlResolvers } from './app.graphql';
import { AppService } from './app.service';

@Module({
    imports: [AppGraphQlModule, MdmModule, VsmModule],
    controllers: [AppController],
    providers: [AppService, ...GraphQlResolvers]
})
export class AppModule {}
