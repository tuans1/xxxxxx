import { CarrierAggregate } from '@modules/carrier/domain/aggregates/carrier.aggregate';
import { CarrierDeletedEvent } from '@modules/carrier/domain/events/carrier-deleted.event';
import { CarrierIdValueObject } from '@modules/carrier/domain/value-objects/carrier-id.value-object';
import { MEMORY_DB } from '@shared/vendors/memory/memory.db';

export function handleCarrierDeletedEvent(
    _carrier: CarrierAggregate,
    _event: CarrierDeletedEvent
) {
    MEMORY_DB.Carriers = MEMORY_DB.Carriers.filter(
        (i) =>
            !i.id.equalsTo(
                CarrierIdValueObject.create({ value: _event.payload.id }).data
            )
    );
}
