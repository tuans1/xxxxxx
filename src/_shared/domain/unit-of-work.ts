import { CarrierRepository } from '@modules/carrier/domain/repositories/carrier.repository';
import { Result } from '@shared/_common/utils/result';

export abstract class UnitOfWork {
    protected _carrierRepository: CarrierRepository;

    public abstract get carrierRepository(): CarrierRepository;

    public abstract startTransaction(): Promise<Result>;
    public abstract commitTransaction(): Promise<Result>;
    public abstract rollbackTransaction(): Promise<Result>;
}

export const UnitOfWorkSymbol = Symbol('UnitOfWork');
