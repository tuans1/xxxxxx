import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import {
    CHORUS_MDM_LOCATION_V1_PACKAGE_NAME,
    LOCATION_INFO_SERVICE_NAME,
    LocationInfoServiceClient
} from '@ocean-network-express/om-mdm-protobuf/index.chorus.mdm.location.v1';
import { toArray } from 'rxjs';
import { GetLocationsByCodesInput } from './dtos/get-locations-by-codes/get-locations-by-codes.input';
import { GetLocationsByCodesOutput } from './dtos/get-locations-by-codes/get-locations-by-codes.output';

@Resolver()
export class LocationResolver {
    private _mdmLocationServiceClient: LocationInfoServiceClient;

    constructor(
        @Inject(CHORUS_MDM_LOCATION_V1_PACKAGE_NAME)
        private readonly _mdmGrpcClient: ClientGrpc
    ) {}

    onModuleInit() {
        this._mdmLocationServiceClient =
            this._mdmGrpcClient.getService<LocationInfoServiceClient>(
                LOCATION_INFO_SERVICE_NAME
            );
    }

    @Query(() => GetLocationsByCodesOutput)
    async getLocationsByCodes(
        @Args('input')
        input: GetLocationsByCodesInput
    ): Promise<GetLocationsByCodesOutput> {
        return new Promise((resolve) => {
            this._mdmLocationServiceClient
                .getLocationsByCodes({
                    locationCodeList: input.codes.map((i) => ({
                        locationCode: i
                    }))
                })
                .pipe(toArray())
                .subscribe((response) => {
                    resolve({
                        locations: response.map((i) => ({
                            code: i.location.locationCode,
                            name: i.location.locationName
                        }))
                    });
                });
        });
    }
}
