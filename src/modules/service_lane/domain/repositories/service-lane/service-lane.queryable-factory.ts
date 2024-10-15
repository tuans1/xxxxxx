import { Queryable } from '@shared/_common/interfaces/queryable/queryable';
import { ServiceLaneAggregate } from '../../aggregates/service-lane.aggregate';
import { ServiceLaneIdValueObject } from '../../value-objects/service-lane-id.value-object';

export interface ServiceLaneQueryableFactory {
    createGetServiceLaneByIdQueryable(
        id: ServiceLaneIdValueObject
    ): Queryable<ServiceLaneAggregate>;
}

export const ServiceLaneQueryableFactorySymbol = Symbol(
    'ServiceLaneQueryableFactory'
);
