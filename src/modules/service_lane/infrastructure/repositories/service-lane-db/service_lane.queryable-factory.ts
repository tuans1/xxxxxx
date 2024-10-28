import { ServiceLaneAggregate } from '@modules/service_lane/domain/aggregates/service-lane.aggregate';
import { ServiceLaneQueryableFactory as IServiceLaneQueryableFactory } from '@modules/service_lane/domain/repositories/service-lane/service-lane.queryable-factory';
import { Queryable } from '@shared/_common/interfaces/queryable/queryable';
import { GetListServiceLaneQueryable } from './queryables/get-list-service-lane.queryable';

export class ServiceLaneQueryableFactory
    implements IServiceLaneQueryableFactory
{
    createGetListServiceLaneQueryable(): Queryable<ServiceLaneAggregate[]> {
        return new GetListServiceLaneQueryable({});
    }
}
