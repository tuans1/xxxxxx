import { GrpcOptions, Transport } from '@nestjs/microservices';
import { Configs } from './configs';

export const grpcClientOptions: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
        url: `0.0.0.0:${Configs.app.grpcPort || 5000}`,
        package: [],
        protoPath: [],
        loader: {
            includeDirs: []
        }
    }
};
