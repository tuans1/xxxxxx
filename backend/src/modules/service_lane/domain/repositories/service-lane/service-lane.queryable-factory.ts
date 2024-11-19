import { GetListServiceLaneRequest } from '@ocean-network-express/om-vsm-protobuf/chorus/vsm/service_lane';
import { Queryable } from '@shared/_common/interfaces/queryable/queryable';
import { ServiceLaneAggregate } from '../../aggregates/service-lane.aggregate';

export interface ServiceLaneQueryableFactory {
    createGetListServiceLaneQueryable(
        request: GetListServiceLaneRequest
    ): Queryable<ServiceLaneAggregate[]>;
}

export const ServiceLaneQueryableFactorySymbol = Symbol(
    'ServiceLaneQueryableFactory'
);
