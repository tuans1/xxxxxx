import { join } from 'path';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { CHORUS_MDM_LOCATION_V1_PACKAGE_NAME } from '@ocean-network-express/om-mdm-protobuf/index.chorus.mdm.location.v1';
import { Configs } from '@src/configs';

export const mdmGrpcOptions: GrpcOptions['options'] = {
    url: Configs.app.grpcMdmUrl || `0.0.0.0:${Configs.app.grpcPort || 5000}`,
    package: [CHORUS_MDM_LOCATION_V1_PACKAGE_NAME],
    protoPath: ['chorus/mdm/location/v1/location.proto'],
    loader: {
        includeDirs: [
            join(
                __dirname,
                '../../../..',
                'node_modules/@ocean-network-express/om-mdm-protobuf'
            )
        ]
    }
};

export const mdmGrpcMicroservice: GrpcOptions = {
    transport: Transport.GRPC,
    options: mdmGrpcOptions
};
