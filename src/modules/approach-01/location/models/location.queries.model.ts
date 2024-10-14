import { Field, ObjectType } from '@nestjs/graphql';
import { Location } from './location.model';

@ObjectType()
export class LocationQueries {
    @Field(() => Location, { nullable: true })
    byId: Location;

    @Field(() => Location, { nullable: true })
    byCode: Location;
}
