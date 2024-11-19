import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLocationInput } from './dtos/create-location.input';
import { GetLocationByCodeInput } from './dtos/get-location-by-code.input';
import { GetLocationListByCodesInput } from './dtos/get-location-list-by-codes.input';
import { Location } from './models/location.model';

@Resolver()
export class LocationResolver {
    @Query(() => Location)
    getLocationByCode(
        @Args('input')
        input: GetLocationByCodeInput
    ) {
        return { code: input.code + Date.now(), name: 'name' + Date.now() };
    }

    @Query(() => [Location])
    getLocationListByCodes(
        @Args('input')
        input: GetLocationListByCodesInput
    ) {
        return input.codes.map((i) => ({
            code: i + Date.now(),
            name: 'name' + Date.now()
        }));
    }

    @Mutation(() => Location)
    createLocation(
        @Args('input')
        input: CreateLocationInput
    ) {
        return { code: input.code + Date.now(), name: input.name + Date.now() };
    }
}
