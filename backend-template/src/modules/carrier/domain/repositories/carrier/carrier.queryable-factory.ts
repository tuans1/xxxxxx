import { Queryable } from '@shared/_common/interfaces/queryable/queryable';
import { CarrierAggregate } from '../../aggregates/carrier.aggregate';
import { CarrierIdValueObject } from '../../value-objects/carrier-id.value-object';

export interface CarrierQueryableFactory {
    createGetCarrierByIdQueryable(
        id: CarrierIdValueObject
    ): Queryable<CarrierAggregate>;
}

export const CarrierQueryableFactorySymbol = Symbol('CarrierQueryableFactory');
