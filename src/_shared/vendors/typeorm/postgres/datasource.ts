import { DataSource } from 'typeorm';
import { Configs } from '@src/configs';

export const datasource = new DataSource({
    type: 'postgres',
    host: Configs.postgres.host,
    port: Configs.postgres.port,
    database: Configs.postgres.database,
    username: Configs.postgres.username,
    password: Configs.postgres.password,
    synchronize: false,
    entities: [],
    logging: 'all'
});
