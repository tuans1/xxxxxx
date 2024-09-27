import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CHORUS_MDM_LOCATION_V1_PACKAGE_NAME } from '@ocean-network-express/om-mdm-protobuf/index.chorus.mdm.location.v1';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { grpcClientOptions } from './grpc-client.options';
import { googleCloudGrpcConfigurator } from './grpc-helper';

@Module({
    imports: [
        ClientsModule.register([
            { name: CHORUS_MDM_LOCATION_V1_PACKAGE_NAME, ...grpcClientOptions }
        ])
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: 'MdmPackages',
            useFactory: async () => {
                return await googleCloudGrpcConfigurator(grpcClientOptions);
            }
        }
    ]
})
export class AppModule {}
