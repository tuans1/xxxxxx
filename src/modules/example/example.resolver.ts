import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ExampleResolver {
    @Query(() => String)
    getExample() {
        return 'Example';
    }
}
