import { CarrierAggregate } from '@modules/carrier/domain/aggregates/carrier.aggregate';
import { CarrierCreatedEvent } from '@modules/carrier/domain/events/carrier-created.event';
import { MEMORY_DB } from '@shared/vendors/memory/memory.db';

export function handleCarrierCreatedEvent(
    carrier: CarrierAggregate,
    _event: CarrierCreatedEvent
) {
    MEMORY_DB.Carriers.push(carrier);
}
