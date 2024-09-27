import { Controller, Get, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
    CHORUS_MDM_LOCATION_V1_PACKAGE_NAME,
    GetLocationsByCodesRequest,
    GetLocationsByCodesResponse,
    LOCATION_INFO_SERVICE_NAME,
    LocationCode,
    LocationInfoServiceClient
} from '@ocean-network-express/om-mdm-protobuf/index.chorus.mdm.location.v1';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(
        @Inject(CHORUS_MDM_LOCATION_V1_PACKAGE_NAME)
        private readonly clientService: ClientGrpc,
        private readonly appService: AppService
    ) {}
    private locationInfoService!: LocationInfoServiceClient;
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
    @Get('/location')
    async getLocation(): Promise<Observable<GetLocationsByCodesResponse>> {
        this.locationInfoService =
            this.clientService.getService<LocationInfoServiceClient>(
                LOCATION_INFO_SERVICE_NAME
            );
        const code: LocationCode = {
            locationCode: 'DEGCI'
        };
        const request: GetLocationsByCodesRequest = {
            locationCodeList: [code]
        };
        return this.locationInfoService.getLocationsByCodes(request);
    }
}
