export const Configs = {
    app: {
        env: process.env.APP_ENV || 'local',
        globalPrefix: process.env.APP_GLOBAL_PREFIX || '/vsm/bff',
        httpPort: Number(process.env.APP_HTTP_PORT) || 3000
    },
    chorus: {
        mdm: {
            grpcUrl: process.env.CHORUS_MDM_GRPC_URL
        }
    }
};
