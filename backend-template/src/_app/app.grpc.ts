import { join } from 'path';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { Configs } from '@src/configs';

export const appGrpcOptions: GrpcOptions['options'] = {
    url: `0.0.0.0:${Configs.app.grpcPort || 5001}`,
    package: ['chorus.vsm.service_lane.v1'],
    protoPath: ['service_lane.proto'],
    loader: {
        includeDirs: [
            join(
                __dirname,
                '../..',
                'node_modules/@ocean-network-express/om-vsm-protobuf'
            )
        ]
    }
};

export const appGrpcMicroservice: GrpcOptions = {
    transport: Transport.GRPC,
    options: appGrpcOptions
};
