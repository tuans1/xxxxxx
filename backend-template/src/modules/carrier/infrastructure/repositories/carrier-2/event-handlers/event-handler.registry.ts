import { CarrierCreatedEvent } from '@modules/carrier/domain/events/carrier-created.event';
import { CarrierDeletedEvent } from '@modules/carrier/domain/events/carrier-deleted.event';
import { CarrierNameChangedEvent } from '@modules/carrier/domain/events/carrier-name-changed.event';
import { handleCarrierCreatedEvent } from './carrier-created.event-handler';
import { handleCarrierDeletedEvent } from './carrier-deleted.event-handler';
import { handleCarrierNameChangedEvent } from './carrier-name-changed.event-handler';

export const EVENT_HANDLER_REGISTRY = {
    [CarrierCreatedEvent.name]: handleCarrierCreatedEvent,
    [CarrierNameChangedEvent.name]: handleCarrierNameChangedEvent,
    [CarrierDeletedEvent.name]: handleCarrierDeletedEvent
};
