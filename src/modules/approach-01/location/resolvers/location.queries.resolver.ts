import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { LocationByCodeInput } from '../dtos/location-by-code.input';
import { Location } from '../models/location.model';
import { LocationQueries } from '../models/location.queries.model';

@Resolver(() => LocationQueries)
export class LocationQueriesResolver {
    @ResolveField('byId', () => Location)
    getById() {
        return { code: 'code' + Date.now(), name: 'name' + Date.now() };
    }

    @ResolveField('byCode', () => Location)
    getByCode(
        @Args('input')
        input: LocationByCodeInput
    ) {
        return { code: input.code + Date.now(), name: 'name' + Date.now() };
    }
}
