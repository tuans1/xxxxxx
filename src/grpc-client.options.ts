import { join } from 'path';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { CHORUS_MDM_LOCATION_V1_PACKAGE_NAME } from '@ocean-network-express/om-mdm-protobuf/index.chorus.mdm.location.v1';

export const grpcClientOptions: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
        url:
            process.env.GRPC_MDM_URL ||
            `0.0.0.0:${process.env.APP_GRPC_PORT || 5000}`,
        package: [CHORUS_MDM_LOCATION_V1_PACKAGE_NAME],
        protoPath: ['chorus/mdm/location/v1/location.proto'],
        loader: {
            includeDirs: [
                join(
                    __dirname,
                    '..',
                    'node_modules/@ocean-network-express/om-mdm-protobuf'
                )
            ]
        }
    }
};
