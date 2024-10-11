import { CarrierAggregate } from '@modules/carrier/domain/aggregates/carrier.aggregate';
import { CarrierQueryableFactory as ICarrierQueryableFactory } from '@modules/carrier/domain/repositories/carrier/carrier.queryable-factory';
import { CarrierIdValueObject } from '@modules/carrier/domain/value-objects/carrier-id.value-object';
import { Queryable } from '@shared/_common/interfaces/queryable/queryable';
import { GetCarrierByIdQueryable } from './queryables/get-carrier-by-id.queryable';

export class CarrierQueryableFactory implements ICarrierQueryableFactory {
    createGetCarrierByIdQueryable(
        id: CarrierIdValueObject
    ): Queryable<CarrierAggregate> {
        return new GetCarrierByIdQueryable({ carrierId: id });
    }
}
