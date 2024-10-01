import { Module } from '@nestjs/common';
import { MdmGrpcClientProvider } from './grpc-provider';

@Module({
    providers: [MdmGrpcClientProvider]
})
export class MdmClientModule {}
