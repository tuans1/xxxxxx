import { CarrierAggregate } from '@modules/carrier/domain/aggregates/carrier.aggregate';
import { CarrierRepository as BaseCarrierRepository } from '@modules/carrier/domain/repositories/carrier/carrier.repository';
import { Error } from '@shared/_common/errors/error';
import { Result } from '@shared/_common/utils/result';
import { datasource } from '@shared/vendors/typeorm/postgres/datasource';
import { QueryRunner } from 'typeorm';
import { EVENT_HANDLER_REGISTRY } from './event-handlers/event-handler.registry';

export class CarrierRepository extends BaseCarrierRepository {
    private readonly _queryRunner: QueryRunner;
    private readonly _useTransaction: boolean;

    constructor(
        queryRunner: QueryRunner = datasource.createQueryRunner(),
        useTransaction: boolean = true
    ) {
        super();
        this._queryRunner = queryRunner;
        this._useTransaction = useTransaction;
    }

    async persist(carrier: CarrierAggregate): Promise<Result> {
        try {
            if (!this._queryRunner.connection.isInitialized) {
                await this._queryRunner.connect();
            }

            if (this._useTransaction) {
                await this._queryRunner.startTransaction();
            }

            for (const event of carrier.events) {
                await EVENT_HANDLER_REGISTRY[event.constructor.name]?.(
                    carrier,
                    event,
                    this._queryRunner
                );
            }

            if (this._useTransaction) {
                await this._queryRunner.commitTransaction();
            }

            return Result.success({});
        } catch (_e: unknown) {
            if (this._useTransaction) {
                await this._queryRunner.rollbackTransaction();
            }

            return Result.fail(Error.serverError());
        } finally {
            if (this._useTransaction) {
                await this._queryRunner.release();
            }
        }
    }
}
