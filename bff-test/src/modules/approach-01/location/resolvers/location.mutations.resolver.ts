import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { LocationCreateInput } from '../dtos/location-create.input';
import { Location } from '../models/location.model';
import { LocationMutations } from '../models/location.mutations.model';

@Resolver(() => LocationMutations)
export class LocationMutationsResolver {
    @ResolveField('create', () => Location)
    create(
        @Args('input')
        input: LocationCreateInput
    ) {
        return { code: input.code + Date.now(), name: input.name + Date.now() };
    }

    @ResolveField('update', () => Location)
    update() {
        return { code: 'code' + Date.now(), name: 'name' + Date.now() };
    }

    @ResolveField('delete', () => Location)
    delete() {
        return { code: 'code' + Date.now(), name: 'name' + Date.now() };
    }
}
