import { CarrierRepository as ICarrierRepository } from '@modules/carrier/domain/repositories/carrier/carrier.repository';
import { CarrierRepository } from '@modules/carrier/infrastructure/repositories/carrier/carrier.repository';
import { Result } from '@shared/_common/utils/result';
import { UnitOfWork as BaseUnitOfWork } from '@shared/domain/unit-of-work';

export class UnitOfWork extends BaseUnitOfWork {
    constructor() {
        super();
    }

    public get carrierRepository(): ICarrierRepository {
        if (!this._carrierRepository) {
            this._carrierRepository = new CarrierRepository();
        }

        return this._carrierRepository;
    }

    public async startTransaction(): Promise<Result> {
        return Result.success({});
    }

    public async commitTransaction(): Promise<Result> {
        return Result.success({});
    }

    public async rollbackTransaction(): Promise<Result> {
        return Result.success({});
    }
}
