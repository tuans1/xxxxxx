import { ServiceLaneCreatedEvent } from '@modules/service_lane/domain/events/service-lane-created.event';
import { handleServiceLaneCreatedEvent } from './service-lane-created.event-handler';

export const EVENT_HANDLER_REGISTRY = {
    [ServiceLaneCreatedEvent.name]: handleServiceLaneCreatedEvent
};
