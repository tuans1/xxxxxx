import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { LocationListByCodesInput } from '../dtos/location-list-by-codes.input';
import { LocationListQueries } from '../models/location-list.queries.model';
import { Location } from '../models/location.model';

@Resolver(() => LocationListQueries)
export class LocationListQueriesResolver {
    @ResolveField('all', () => [Location])
    getAll() {
        return [{ code: 'code' + Date.now(), name: 'name' + Date.now() }];
    }

    @ResolveField('byCodes', () => [Location])
    getByCodes(
        @Args('input')
        input: LocationListByCodesInput
    ) {
        return input.codes.map((i) => ({
            code: 'code' + i,
            name: 'name' + Date.now()
        }));
    }
}
