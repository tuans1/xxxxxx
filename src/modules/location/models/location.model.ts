import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Location {
    @Field()
    code: string;

    @Field()
    name: string;
}
