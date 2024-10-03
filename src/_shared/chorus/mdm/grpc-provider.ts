import { FactoryProvider } from '@nestjs/common';
import { CHORUS_MDM_LOCATION_V1_PACKAGE_NAME } from '@ocean-network-express/om-mdm-protobuf/index.chorus.mdm.location.v1';
import { mdmGrpcClientOptions } from './grpc-client.options';
import { googleCloudGrpcConfigurator } from './grpc-helper';

export const MdmGrpcClientProvider: FactoryProvider = {
    provide: CHORUS_MDM_LOCATION_V1_PACKAGE_NAME,
    useFactory: async () => {
        return await googleCloudGrpcConfigurator(mdmGrpcClientOptions);
    }
};
