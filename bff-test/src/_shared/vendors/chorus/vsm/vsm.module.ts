import { Module, Provider } from '@nestjs/common';
import { googleCloudGrpcConfigurator } from '@shared/_common/helpers/gcp-grpc-configurator';
import { vsmGrpcMicroservice } from './vsm.grpc';

const providers: Provider[] = [
    {
        provide: 'chorus.vsm.service_lane.v1',
        useFactory: async () => {
            return await googleCloudGrpcConfigurator(vsmGrpcMicroservice);
        }
    }
];

@Module({
    providers: providers,
    exports: providers
})
export class VsmModule {}
