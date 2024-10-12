import { join } from 'path';
import { ExampleResolver } from '@modules/example/example.resolver';
import { LocationResolver } from '@modules/location/location.resolver';
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

export const GraphQlResolvers = [ExampleResolver, LocationResolver];
