import { Result } from '@shared/_common/utils/result';
import { CarrierAggregate } from '../aggregates/carrier.aggregate';
import { CarrierIdValueObject } from '../value-objects/carrier-id.value-object';

export interface CarrierRepository {
    getById(id: CarrierIdValueObject): Promise<Result<CarrierAggregate>>;

    persist(carrier: CarrierAggregate): Promise<Result>;
}

export const CarrierRepositorySymbol = Symbol('CarrierRepository');
