import { join } from 'path';
import { LocationResolver } from '@modules/approach-02/location/location.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Configs } from '@src/configs';

export const AppGraphQlModule = GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    useFactory() {
        return {
            path: `${Configs.app.globalPrefix}/graphql`,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql')
        };
    }
});

export const GraphQlResolvers = [
    // Approach 1
    // RootResolver,
    // LocationListQueriesResolver,
    // LocationQueriesResolver,
    // LocationMutationsResolver

    // Approach 2
    LocationResolver
];
