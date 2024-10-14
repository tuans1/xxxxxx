import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LocationCreateInput {
    @Field(() => String)
    code: string;

    @Field(() => String)
    name: string;
}
