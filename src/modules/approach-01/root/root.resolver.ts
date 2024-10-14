import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { LocationListQueries } from '../location/models/location-list.queries.model';
import { LocationMutations } from '../location/models/location.mutations.model';
import { LocationQueries } from '../location/models/location.queries.model';

@Resolver()
export class RootResolver {
    @Query(() => LocationListQueries, { name: 'locations' })
    locationListQueries() {
        return new LocationListQueries();
    }

    @Query(() => LocationQueries, { name: 'location' })
    locationQueries() {
        return new LocationQueries();
    }

    @Mutation(() => LocationMutations, { name: 'location' })
    locationMutations() {
        return new LocationMutations();
    }
}
