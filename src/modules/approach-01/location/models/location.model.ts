import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Location {
    @Field(() => String)
    code: string;

    @Field(() => String)
    name: string;
}
