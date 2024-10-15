import { ServiceLaneAggregate } from '@modules/service_lane/domain/aggregates/service-lane.aggregate';
import { ServiceLaneCreatedEvent } from '@modules/service_lane/domain/events/service-lane-created.event';
import { MEMORY_DB } from '@shared/vendors/memory/memory.db';

export function handleServiceLaneCreatedEvent(
    serviceLane: ServiceLaneAggregate,
    _event: ServiceLaneCreatedEvent
) {
    console.log('handleServiceLaneCreatedEvent');
    MEMORY_DB.ServiceLanes.push(serviceLane);
}
