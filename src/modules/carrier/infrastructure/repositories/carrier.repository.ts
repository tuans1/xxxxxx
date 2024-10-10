import { CarrierAggregate } from '@modules/carrier/domain/aggregates/carrier.aggregate';
import { CarrierCreatedEvent } from '@modules/carrier/domain/events/carrier-created.event';
import { CarrierDeletedEvent } from '@modules/carrier/domain/events/carrier-deleted.event';
import { CarrierNameChangedEvent } from '@modules/carrier/domain/events/carrier-name-changed.event';
import { CarrierRepository as ICarrierRepository } from '@modules/carrier/domain/repositories/carrier.repository';
import { CarrierIdValueObject } from '@modules/carrier/domain/value-objects/carrier-id.value-object';
import { Error } from '@shared/_common/errors/error';
import { Result } from '@shared/_common/utils/result';

export const MEMORY_DB: {
    Carriers: CarrierAggregate[];
} = {
    Carriers: []
};

export class CarrierRepository implements ICarrierRepository {
    async getById(id: CarrierIdValueObject): Promise<Result<CarrierAggregate>> {
        const foundCarrier = MEMORY_DB.Carriers.find((i) => i.id.equalsTo(id));

        if (!foundCarrier) {
            return Result.fail(Error.notFound());
        }

        return Result.success(foundCarrier);
    }

    async persist(carrier: CarrierAggregate): Promise<Result> {
        const handleCarrierCreatedEvent = (_event: CarrierCreatedEvent) => {
            MEMORY_DB.Carriers.push(carrier);
        };

        const handleCarrierNameChangedEvent = (
            event: CarrierNameChangedEvent
        ) => {
            const index = MEMORY_DB.Carriers.findIndex((i) =>
                i.id.equalsTo(
                    CarrierIdValueObject.create({ value: event.payload.id })
                        .data
                )
            );

            MEMORY_DB.Carriers[index] = carrier;
        };

        const handleCarrierDeletedEvent = (event: CarrierDeletedEvent) => {
            MEMORY_DB.Carriers = MEMORY_DB.Carriers.filter(
                (i) =>
                    !i.id.equalsTo(
                        CarrierIdValueObject.create({ value: event.payload.id })
                            .data
                    )
            );
        };

        const eventHandleRegistry = {
            [CarrierCreatedEvent.name]: handleCarrierCreatedEvent,
            [CarrierNameChangedEvent.name]: handleCarrierNameChangedEvent,
            [CarrierDeletedEvent.name]: handleCarrierDeletedEvent
        };

        for (const event of carrier.events) {
            eventHandleRegistry[event.constructor.name]?.(event as any);
        }

        return Result.success({});
    }
}
