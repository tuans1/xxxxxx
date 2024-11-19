import { ServiceLaneAggregate } from '@modules/service_lane/domain/aggregates/service-lane.aggregate';
import { ServiceLaneDataMapper } from '@modules/service_lane/infrastructure/data_mappers/service-lane.data-mapper';
import { GetListServiceLaneRequest } from '@ocean-network-express/om-vsm-protobuf/chorus/vsm/service_lane';
import { Error } from '@shared/_common/errors/error';
import { Queryable } from '@shared/_common/interfaces/queryable/queryable';
import { Result } from '@shared/_common/utils/result';
import { datasource } from '@shared/vendors/typeorm/postgres/datasource';
import { ServiceLaneEntity } from '@shared/vendors/typeorm/postgres/entities/ServiceLaneEntity';
import { QueryRunner, Raw } from 'typeorm';

export class GetListServiceLaneQueryable
    implements Queryable<ServiceLaneAggregate[]>
{
    private readonly _queryRunner: QueryRunner;
    private readonly _args: GetListServiceLaneRequest;

    constructor(args: GetListServiceLaneRequest) {
        this._args = args;
        this._queryRunner = datasource.createQueryRunner();
    }

    async execute(): Promise<Result<ServiceLaneAggregate[], Error<any>>> {
        try {
            if (!this._queryRunner.connection.isInitialized) {
                await this._queryRunner.connect();
            }

            const serviceLaneOrmEntity = await this._queryRunner.manager.find(
                ServiceLaneEntity,
                {
                    where: {
                        name: Raw(
                            (alias) => `LOWER(${alias}) LIKE LOWER(:name)`,
                            {
                                name: `%${this._args.keyword}%`
                            }
                        )
                    }
                }
            );
            console.log(serviceLaneOrmEntity, '---------serviceLaneOrmEntity');
            const transformResult =
                ServiceLaneDataMapper.transformPersistListToDomain(
                    serviceLaneOrmEntity
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
