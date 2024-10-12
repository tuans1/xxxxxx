import { Module } from '@nestjs/common';
import { MdmModule } from '@shared/vendors/chorus/mdm/mdm.module';
import { AppController } from './app.controller';
import { AppGraphQlModule, GraphQlResolvers } from './app.graphql';
import { AppService } from './app.service';

@Module({
    imports: [AppGraphQlModule, MdmModule],
    controllers: [AppController],
    providers: [AppService, ...GraphQlResolvers]
})
export class AppModule {}
