import { Event } from '@base/base.event';
import { CarrierAggregate } from '@modules/carrier/domain/aggregates/carrier.aggregate';
import { CarrierCreatedEvent } from '@modules/carrier/domain/events/carrier-created.event';
import { CarrierEntity as CarrierOrmEntity } from '@shared/vendors/typeorm/postgres/entities/CarrierEntity';
import { QueryRunner } from 'typeorm';

export async function handleCarrierCreatedEvent(
    _carrier: CarrierAggregate,
    event: Event,
    queryRunner: QueryRunner
) {
    if (!(event instanceof CarrierCreatedEvent)) {
        return;
    }

    const { id, name, code } = event.payload;

    await queryRunner.manager.insert(CarrierOrmEntity, {
        id,
        name,
        code
    });
}
