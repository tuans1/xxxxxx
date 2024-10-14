import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LocationByCodeInput {
    @Field(() => String)
    code: string;
}
