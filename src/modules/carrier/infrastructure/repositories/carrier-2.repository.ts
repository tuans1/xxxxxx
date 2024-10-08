import { CarrierAggregate } from '@modules/carrier/domain/aggregates/carrier.aggregate';
import { CarrierCreatedEvent } from '@modules/carrier/domain/events/carrier-created.event';
import { CarrierRepository as ICarrierRepository } from '@modules/carrier/domain/repositories/carrier.repository';
import { CarrierIdValueObject } from '@modules/carrier/domain/value-objects/carrier-id.value-object';
import { Error } from '@shared/_common/errors/error';
import { Result } from '@shared/_common/utils/result';
import { datasource } from '@shared/vendors/typeorm/postgres/datasource';
import { CarrierEntity } from '@shared/vendors/typeorm/postgres/entities/CarrierEntity';
import { QueryRunner } from 'typeorm';

export class CarrierRepository implements ICarrierRepository {
    private static readonly EVENT_HANDLER_REGISTRY: any = {
        [CarrierCreatedEvent.name]: CarrierRepository.handleCarrierCreatedEvent
    };

    private readonly _queryRunner: QueryRunner;
    private readonly _useTransaction: boolean;

    constructor(
        queryRunner: QueryRunner = datasource.createQueryRunner(),
        useTransaction: boolean = true
    ) {
        this._queryRunner = queryRunner;
        this._useTransaction = useTransaction;
    }

    async getById(
        _id: CarrierIdValueObject
    ): Promise<Result<CarrierAggregate>> {
        return Result.fail(Error.simple('Not implemented yet'));
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
                await CarrierRepository.EVENT_HANDLER_REGISTRY[
                    event.constructor.name
                ]?.(event, this._queryRunner);
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

    private static async handleCarrierCreatedEvent(
        event: CarrierCreatedEvent,
        queryRunner: QueryRunner
    ) {
        const { id, name, code } = event.payload;

        await queryRunner.manager.insert(CarrierEntity, {
            id,
            name,
            code
        });
    }
}
