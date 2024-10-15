import { ServiceLaneAggregate } from '@modules/service_lane/domain/aggregates/service-lane.aggregate';
import { ServiceLaneQueryableFactory as IServiceLaneQueryableFactory } from '@modules/service_lane/domain/repositories/service-lane/service-lane.queryable-factory';
import { ServiceLaneIdValueObject } from '@modules/service_lane/domain/value-objects/service-lane-id.value-object';
import { Queryable } from '@shared/_common/interfaces/queryable/queryable';
import { GetServiceLaneByIdQueryable } from './queryables/get-service-lane-by-id.queryable';
export class ServiceLaneQueryableFactory
    implements IServiceLaneQueryableFactory
{
    createGetServiceLaneByIdQueryable(
        id: ServiceLaneIdValueObject
    ): Queryable<ServiceLaneAggregate> {
        return new GetServiceLaneByIdQueryable({ serviceLaneId: id });
    }
}
