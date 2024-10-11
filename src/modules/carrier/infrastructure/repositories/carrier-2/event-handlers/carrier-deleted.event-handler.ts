import { Event } from '@base/base.event';
import { CarrierAggregate } from '@modules/carrier/domain/aggregates/carrier.aggregate';
import { CarrierDeletedEvent } from '@modules/carrier/domain/events/carrier-deleted.event';
import { CarrierEntity as CarrierOrmEntity } from '@shared/vendors/typeorm/postgres/entities/CarrierEntity';
import { QueryRunner } from 'typeorm';

export async function handleCarrierDeletedEvent(
    _carrier: CarrierAggregate,
    event: Event,
    queryRunner: QueryRunner
) {
    if (!(event instanceof CarrierDeletedEvent)) {
        return;
    }

    const { id } = event.payload;

    await queryRunner.manager.delete(CarrierOrmEntity, { id });
}
