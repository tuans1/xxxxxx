import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
    CHORUS_MDM_LOCATION_V1_PACKAGE_NAME,
    GetLocationsByCodesRequest,
    LOCATION_INFO_SERVICE_NAME,
    LocationCode,
    LocationInfoServiceClient
} from '@ocean-network-express/om-mdm-protobuf/index.chorus.mdm.location.v1';

@Injectable()
export class AppService implements OnModuleInit {
    private mdmLocationInfoServiceClient: LocationInfoServiceClient;

    constructor(
        @Inject(CHORUS_MDM_LOCATION_V1_PACKAGE_NAME)
        private readonly mdmGrpcCient: ClientGrpc
    ) {}

    onModuleInit() {
        this.mdmLocationInfoServiceClient =
            this.mdmGrpcCient.getService<LocationInfoServiceClient>(
                LOCATION_INFO_SERVICE_NAME
            );
    }

    getHello(): string {
        return 'Hello World!';
    }

    getHealth(): string {
        return 'Healthy!';
    }

    getLocation() {
        const locationCode: LocationCode = {
            locationCode: 'DEGCI'
        };

        const request: GetLocationsByCodesRequest = {
            locationCodeList: [locationCode]
        };

        return this.mdmLocationInfoServiceClient.getLocationsByCodes(request);
    }
}
