import { Event } from '@base/base.event';
import { ServiceLaneAggregate } from '@modules/service_lane/domain/aggregates/service-lane.aggregate';
import { ServiceLaneCreatedEvent } from '@modules/service_lane/domain/events/service-lane-created.event';
import { ServiceLaneEntity } from '@shared/vendors/typeorm/postgres/entities/ServiceLaneEntity';
import { QueryRunner } from 'typeorm';

export async function handleServiceLaneCreatedEvent(
    _serviceLane: ServiceLaneAggregate,
    event: Event,
    queryRunner: QueryRunner
) {
    if (!(event instanceof ServiceLaneCreatedEvent)) {
        return;
    }

    const { id, name, code } = event.payload;
    console.log(event.present, '--------------------');
    await queryRunner.manager.insert(ServiceLaneEntity, {
        id,
        name,
        code
    });
}
