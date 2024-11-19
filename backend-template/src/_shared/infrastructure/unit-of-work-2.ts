import { CarrierRepository as ICarrierRepository } from '@modules/carrier/domain/repositories/carrier/carrier.repository';
import { CarrierRepository } from '@modules/carrier/infrastructure/repositories/carrier-2/carrier.repository';
import { Error } from '@shared/_common/errors/error';
import { Result } from '@shared/_common/utils/result';
import { UnitOfWork as BaseUnitOfWork } from '@shared/domain/unit-of-work';
import { datasource } from '@shared/vendors/typeorm/postgres/datasource';
import { QueryRunner } from 'typeorm';

export class UnitOfWork extends BaseUnitOfWork {
    private readonly _queryRunner: QueryRunner;

    constructor() {
        super();
        this._queryRunner = datasource.createQueryRunner();
    }

    public get carrierRepository(): ICarrierRepository {
        if (!this._carrierRepository) {
            this._carrierRepository = new CarrierRepository(
                this._queryRunner,
                false
            );
        }

        return this._carrierRepository;
    }

    public async startTransaction(): Promise<Result> {
        try {
            if (!this._queryRunner.connection.isInitialized) {
                await this._queryRunner.connect();
            }

            await this._queryRunner.startTransaction();

            return Result.success({});
        } catch (_e) {
            return Result.fail(Error.serverError());
        }
    }

    public async commitTransaction(): Promise<Result> {
        try {
            await this._queryRunner.commitTransaction();
            await this._queryRunner.release();
            return Result.success({});
        } catch (_e) {
            return Result.fail(Error.serverError());
        }
    }

    public async rollbackTransaction(): Promise<Result> {
        try {
            await this._queryRunner.rollbackTransaction();
            await this._queryRunner.release();
            return Result.success({});
        } catch (_e) {
            return Result.fail(Error.serverError());
        }
    }
}
