import { GrpcOptions, Transport } from '@nestjs/microservices';
import { Configs } from '@src/configs';

export const appGrpcOptions: GrpcOptions['options'] = {
    url: `0.0.0.0:${Configs.app.grpcPort || 5000}`,
    package: [],
    protoPath: [],
    loader: {
        includeDirs: []
    }
};

export const appGrpcMicroservice: GrpcOptions = {
    transport: Transport.GRPC,
    options: appGrpcOptions
};
