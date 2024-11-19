import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetLocationListByCodesInput {
    @Field(() => [String])
    codes: string[];
}
