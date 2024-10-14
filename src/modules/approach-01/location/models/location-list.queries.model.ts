import { Field, ObjectType } from '@nestjs/graphql';
import { Location } from './location.model';

@ObjectType()
export class LocationListQueries {
    @Field(() => [Location], { nullable: true })
    all: Location[];

    @Field(() => [Location], { nullable: true })
    byCodes: Location[];
}
