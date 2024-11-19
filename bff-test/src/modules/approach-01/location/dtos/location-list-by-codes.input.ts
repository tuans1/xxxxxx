import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LocationListByCodesInput {
    @Field(() => [String])
    codes: string[];
}
