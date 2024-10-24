// import { ServiceLaneRepository as BaseServiceLaneRepository } from '@modules/service_lane/domain/repositories/service_lane/service_lane.repository';
import { ServiceLaneAggregate } from '@modules/service_lane/domain/aggregates/service-lane.aggregate';
import { ServiceLaneRepository as BaseServiceLaneRepository } from '@modules/service_lane/domain/repositories/service-lane/service-lane.repository';
import { Error } from '@shared/_common/errors/error';
import { Result } from '@shared/_common/utils/result';
import { datasource } from '@shared/vendors/typeorm/postgres/datasource';
import { QueryRunner } from 'typeorm';
import { SERVICE_LANE_EVENT_HANDLER_REGISTRY } from './event-handlers/event-handler.registry';

export class ServiceLaneRepository extends BaseServiceLaneRepository {
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

    async persist(serviceLane: ServiceLaneAggregate): Promise<Result> {
        try {
            if (!this._queryRunner.connection.isInitialized) {
                await this._queryRunner.connect();
            }

            if (this._useTransaction) {
                await this._queryRunner.startTransaction();
            }

            for (const event of serviceLane.events) {
                await SERVICE_LANE_EVENT_HANDLER_REGISTRY[
                    event.constructor.name
                ]?.(serviceLane, event, this._queryRunner);
            }
            console.log(this._useTransaction, '----------------');

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
