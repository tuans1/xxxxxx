import { Queryable } from '@shared/_common/interfaces/queryable/queryable';
import { ServiceLaneAggregate } from '../../aggregates/service-lane.aggregate';

export interface ServiceLaneQueryableFactory {
    createGetListServiceLaneQueryable(): Queryable<ServiceLaneAggregate[]>;
}

export const ServiceLaneQueryableFactorySymbol = Symbol(
    'ServiceLaneQueryableFactory'
);
