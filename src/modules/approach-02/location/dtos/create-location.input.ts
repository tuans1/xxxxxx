import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {
    @Field(() => String)
    code: string;

    @Field(() => String)
    name: string;
}
