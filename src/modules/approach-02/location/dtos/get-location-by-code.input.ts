import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetLocationByCodeInput {
    @Field(() => String)
    code: string;
}
