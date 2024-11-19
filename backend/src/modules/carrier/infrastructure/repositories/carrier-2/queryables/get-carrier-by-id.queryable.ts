import { CarrierAggregate } from '@modules/carrier/domain/aggregates/carrier.aggregate';
import { CarrierIdValueObject } from '@modules/carrier/domain/value-objects/carrier-id.value-object';
import { CarrierDataMapper } from '@modules/carrier/infrastructure/data-mappers/carrier.data-mapper';
import { Error } from '@shared/_common/errors/error';
import { Queryable } from '@shared/_common/interfaces/queryable/queryable';
import { Result } from '@shared/_common/utils/result';
import { datasource } from '@shared/vendors/typeorm/postgres/datasource';
import { CarrierEntity as CarrierOrmEntity } from '@shared/vendors/typeorm/postgres/entities/CarrierEntity';
import { QueryRunner } from 'typeorm';

type Args = {
    carrierId: CarrierIdValueObject;
};

export class GetCarrierByIdQueryable implements Queryable<CarrierAggregate> {
    private readonly _args: Args;
    private readonly _queryRunner: QueryRunner;

    constructor(args: Args) {
        this._args = args;
        this._queryRunner = datasource.createQueryRunner();
    }

    async execute(): Promise<Result<CarrierAggregate, Error<any>>> {
        try {
            if (!this._queryRunner.connection.isInitialized) {
                await this._queryRunner.connect();
            }

            const carrierOrmEntity = await this._queryRunner.manager.findOneBy(
                CarrierOrmEntity,
                {
                    id: this._args.carrierId.value
                }
            );

            const transformResult =
                CarrierDataMapper.transformPersistToDomain(carrierOrmEntity);

            if (transformResult.isFail) {
                return Result.fail(transformResult.error);
            }

            return Result.success(transformResult.data);
        } catch (_e: unknown) {
            return Result.fail(Error.serverError());
        }
    }
}
