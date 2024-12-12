import { join } from 'path';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { CHORUS_VSM_SERVICE_LANE_V1_PACKAGE_NAME } from '@ocean-network-express/om-vsm-protobuf/chorus/vsm/service_lane';
import { Configs } from '@src/configs';

export const vsmGrpcOptions: GrpcOptions['options'] = {
    url: `0.0.0.0:${Configs.app.grpcPort || 5001}`,
    package: [CHORUS_VSM_SERVICE_LANE_V1_PACKAGE_NAME],
    protoPath: ['service_lane.proto'],
    loader: {
        includeDirs: [
            join(
                __dirname,
                '../../../../..',
                'node_modules/@ocean-network-express/om-vsm-protobuf'
            )
        ]
    }
};

export const vsmGrpcMicroservice: GrpcOptions = {
    transport: Transport.GRPC,
    options: vsmGrpcOptions
};
