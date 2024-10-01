import * as GRPC from '@grpc/grpc-js';
import {
    ClientProxy,
    ClientProxyFactory,
    Closeable,
    GrpcOptions
} from '@nestjs/microservices';
import { GoogleAuth } from 'google-auth-library';

export async function googleCloudGrpcConfigurator(
    targetGrpcServer: GrpcOptions
): Promise<ClientProxy & Closeable> {
    const audience = targetGrpcServer.options.url.split(':')[0];
    const target = `https://${audience}`;
    const idTokenClient = await new GoogleAuth().getIdTokenClient(target);
    const channelCredentials = GRPC.credentials.createSsl();
    const callCreds =
        GRPC.credentials.createFromGoogleCredential(idTokenClient);
    targetGrpcServer.options.credentials =
        GRPC.credentials.combineChannelCredentials(
            channelCredentials,
            callCreds
        );
    return ClientProxyFactory.create(targetGrpcServer);
}
