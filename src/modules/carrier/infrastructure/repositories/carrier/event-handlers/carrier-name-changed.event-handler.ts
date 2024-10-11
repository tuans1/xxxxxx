import { CarrierAggregate } from '@modules/carrier/domain/aggregates/carrier.aggregate';
import { CarrierNameChangedEvent } from '@modules/carrier/domain/events/carrier-name-changed.event';
import { CarrierIdValueObject } from '@modules/carrier/domain/value-objects/carrier-id.value-object';
import { MEMORY_DB } from '@shared/vendors/memory/memory.db';

export function handleCarrierNameChangedEvent(
    carrier: CarrierAggregate,
    event: CarrierNameChangedEvent
) {
    const index = MEMORY_DB.Carriers.findIndex((i) =>
        i.id.equalsTo(
            CarrierIdValueObject.create({ value: event.payload.id }).data
        )
    );

    MEMORY_DB.Carriers[index] = carrier;
}
