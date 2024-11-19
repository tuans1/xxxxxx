import { CarrierAggregate } from '@modules/carrier/domain/aggregates/carrier.aggregate';
import { ServiceLaneAggregate } from '@modules/service_lane/domain/aggregates/service-lane.aggregate';

type Schema = {
    Carriers: CarrierAggregate[];
    ServiceLanes: ServiceLaneAggregate[];
};

export const MEMORY_DB: Schema = {
    Carriers: [],
    ServiceLanes: []
};
