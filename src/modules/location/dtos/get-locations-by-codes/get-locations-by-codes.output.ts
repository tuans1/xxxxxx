import { Location } from '@modules/location/models/location.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetLocationsByCodesOutput {
    @Field(() => [Location])
    locations: Location[];
}
