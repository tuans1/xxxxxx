export const Configs = {
    app: {
        env: process.env.APP_ENV,
        globalPrefix: process.env.APP_GLOBAL_PREFIX,
        httpPort: Number(process.env.APP_HTTP_PORT),
        grpcPort: Number(process.env.APP_GRPC_PORT),
        grpcMdmUrl: process.env.GRPC_MDM_URL
    },
    postgres: {
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        database: process.env.POSTGRES_DATABASE,
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD
    },
    sendgrid: {
        apiKey: process.env.SENDGRID_API_KEY
    },
    kafka: {
        brokers: process.env.KAFKA_BROKERS?.split(/s*,s*/),
        clientId: process.env.KAFKA_CLIENT_ID,
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
        mechanism: process.env.KAFKA_MECHANISM,
        ssl: Boolean(process.env.KAFKA_SSL),
        requestTimeout: Number(process.env.KAFKA_REQUEST_TIMEOUT),
        concurrently: process.env.KAFKA_CONCURRENTLY,
        consumerGroupId: process.env.KAFKA_CONSUMER_GROUP_ID
    }
};
