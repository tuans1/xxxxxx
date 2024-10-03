import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CHORUS_MDM_LOCATION_V1_PACKAGE_NAME } from '@ocean-network-express/om-mdm-protobuf/index.chorus.mdm.location.v1';
import { MdmClientModule } from './_shared/chorus/mdm/client.module';
import { mdmGrpcClientOptions } from './_shared/chorus/mdm/grpc-client.options';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        MdmClientModule,
        ClientsModule.register([
            {
                name: CHORUS_MDM_LOCATION_V1_PACKAGE_NAME,
                ...mdmGrpcClientOptions
            }
        ])
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
