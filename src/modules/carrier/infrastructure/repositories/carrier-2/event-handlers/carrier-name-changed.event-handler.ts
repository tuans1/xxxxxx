import { Event } from '@base/base.event';
import { CarrierAggregate } from '@modules/carrier/domain/aggregates/carrier.aggregate';
import { CarrierNameChangedEvent } from '@modules/carrier/domain/events/carrier-name-changed.event';
import { CarrierEntity as CarrierOrmEntity } from '@shared/vendors/typeorm/postgres/entities/CarrierEntity';
import { QueryRunner } from 'typeorm';

export async function handleCarrierNameChangedEvent(
    _carrier: CarrierAggregate,
    event: Event,
    queryRunner: QueryRunner
) {
    if (!(event instanceof CarrierNameChangedEvent)) {
        return;
    }

    const { id, name } = event.payload;

    await queryRunner.manager.update(CarrierOrmEntity, { id }, { name });
}
