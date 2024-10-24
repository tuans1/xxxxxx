import { ServiceLaneCreatedEvent } from '@modules/service_lane/domain/events/service-lane-created.event';
import { handleServiceLaneCreatedEvent } from './service_lane-created.event-handler';

export const SERVICE_LANE_EVENT_HANDLER_REGISTRY = {
    [ServiceLaneCreatedEvent.name]: handleServiceLaneCreatedEvent
};
