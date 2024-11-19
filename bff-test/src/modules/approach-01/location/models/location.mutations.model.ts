import { Field, ObjectType } from '@nestjs/graphql';
import { Location } from './location.model';

@ObjectType()
export class LocationMutations {
    @Field(() => Location, { nullable: true })
    create: Location;

    @Field(() => Location, { nullable: true })
    update: Location;

    @Field(() => Location, { nullable: true })
    delete: Location;
}
