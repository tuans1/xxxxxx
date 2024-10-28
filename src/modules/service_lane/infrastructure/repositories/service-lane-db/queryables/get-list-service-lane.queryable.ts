import { ServiceLaneAggregate } from '@modules/service_lane/domain/aggregates/service-lane.aggregate';
import { ServiceLaneDataMapper } from '@modules/service_lane/infrastructure/data_mappers/service-lane.data-mapper';
import { Error } from '@shared/_common/errors/error';
import { Queryable } from '@shared/_common/interfaces/queryable/queryable';
import { Result } from '@shared/_common/utils/result';
import { datasource } from '@shared/vendors/typeorm/postgres/datasource';
import { ServiceLaneEntity } from '@shared/vendors/typeorm/postgres/entities/ServiceLaneEntity';
import { QueryRunner } from 'typeorm';

type Args = unknown;

export class GetListServiceLaneQueryable
    implements Queryable<ServiceLaneAggregate[]>
{
    private readonly _args: Args;
    private readonly _queryRunner: QueryRunner;

    constructor(args: Args) {
        this._args = args;
        this._queryRunner = datasource.createQueryRunner();
    }

    async execute(): Promise<Result<ServiceLaneAggregate[], Error<any>>> {
        try {
            if (!this._queryRunner.connection.isInitialized) {
                await this._queryRunner.connect();
            }

            const carrierOrmEntity =
                await this._queryRunner.manager.find(ServiceLaneEntity);
            const transformResult =
                ServiceLaneDataMapper.transformPersistListToDomain(
                    carrierOrmEntity
                );
            if (transformResult.isFail) {
                return Result.fail(transformResult.error);
            }

            return Result.success(transformResult.data);
        } catch (_e: unknown) {
            return Result.fail(Error.serverError());
        }
    }
}
