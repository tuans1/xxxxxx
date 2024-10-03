import { Module, Provider } from '@nestjs/common';
import { CHORUS_MDM_LOCATION_V1_PACKAGE_NAME } from '@ocean-network-express/om-mdm-protobuf/index.chorus.mdm.location.v1';
import { googleCloudGrpcConfigurator } from '@shared/_common/helpers/gcp-grpc-configurator';
import { mdmGrpcMicroservice } from './mdm.grpc';

const providers: Provider[] = [
    {
        provide: CHORUS_MDM_LOCATION_V1_PACKAGE_NAME,
        useFactory: async () => {
            return await googleCloudGrpcConfigurator(mdmGrpcMicroservice);
        }
    }
];

@Module({
    providers: providers,
    exports: providers
})
export class MdmModule {}
