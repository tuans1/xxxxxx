import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetLocationsByCodesInput {
    @Field(() => [String])
    codes: string[];
}
