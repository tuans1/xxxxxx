import { ServiceLaneRepository as IServiceLaneRepository } from '@modules/service_lane/domain/repositories/service-lane/service-lane.repository';
import { ServiceLaneRepository } from '@modules/service_lane/infrastructure/repositories/service-lane-db/service_lane.repository';
import { Error } from '@shared/_common/errors/error';
import { Result } from '@shared/_common/utils/result';
import { UnitOfWorkServiceLane } from '@shared/domain/uof-service-lane';
import { datasource } from '@shared/vendors/typeorm/postgres/datasource';
import { QueryRunner } from 'typeorm';

export class UnitOfWorkServiceLaneRepository extends UnitOfWorkServiceLane {
    private readonly _queryRunner: QueryRunner;
    protected _serviceLaneRepository: ServiceLaneRepository;

    constructor() {
        super();
        this._queryRunner = datasource.createQueryRunner();
    }

    public get serviceLaneRepository(): IServiceLaneRepository {
        if (!this._serviceLaneRepository) {
            this._serviceLaneRepository = new ServiceLaneRepository(
                this._queryRunner,
                false
            );
        }

        return this._serviceLaneRepository;
    }

    public async startTransaction(): Promise<Result> {
        try {
            if (!this._queryRunner.connection.isInitialized) {
                await this._queryRunner.connect();
            }

            await this._queryRunner.startTransaction();

            return Result.success({});
        } catch (_e) {
            console.log('CACACACAC UOF');
            return Result.fail(Error.serverError());
        }
    }

    public async commitTransaction(): Promise<Result> {
        try {
            console.log('commitTransaction');
            await this._queryRunner.commitTransaction();
            await this._queryRunner.release();
            return Result.success({});
        } catch (_e) {
            return Result.fail(Error.serverError());
        }
    }

    public async rollbackTransaction(): Promise<Result> {
        try {
            console.log('---------rollbackTransaction');
            await this._queryRunner.rollbackTransaction();
            await this._queryRunner.release();
            return Result.success({});
        } catch (_e) {
            return Result.fail(Error.serverError());
        }
    }
}
