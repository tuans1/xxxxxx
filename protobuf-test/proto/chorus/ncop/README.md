# Config gRPC with om-mdm-protobuf npm

## Install package

1.  Create .npmrc file in root directory and write in below
```
//npm.pkg.github.com/:_authToken=<PAT_TOKEN>
@ocean-network-express:registry=https://npm.pkg.github.com
```
2. Run script to install package
```bash
yarn add @ocean-network-express/om-mdm-protobuf@version
```
## Config grpc server with NestJS

1. Create grpc-option file
```ts
import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:3000',
    package: [
      'chorus.mdm.location.v1',
      'chorus.mdm.vessel.v1',
    ],
    protoPath: [
      'om-mdm-protobuf/location/v1/location.proto',
      'om-mdm-protobuf/vessel/v1/vessel.proto',
    ],
    loader: {
      includeDirs: [
        join(
          __dirname,
          '..',
          'node_modules/@ocean-network-express',
        ),
      ],
    },
  },
};
```
2. Import grpcOption to main.ts
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { grpcClientOptions } from './grpc-client.options';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
  await app.startAllMicroservices();
  await app.listen(null);
}
bootstrap();
```

