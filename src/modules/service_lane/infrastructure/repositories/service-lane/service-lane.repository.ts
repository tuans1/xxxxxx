import { ServiceLaneAggregate } from '@modules/service_lane/domain/aggregates/service-lane.aggregate';
import { ServiceLaneRepository as BaseServiceLaneRepository } from '@modules/service_lane/domain/repositories/service-lane/service-lane.repository';
import { Result } from '@shared/_common/utils/result';
import { EVENT_HANDLER_REGISTRY } from './event-handlers/service-lane-handler.registry';

export class ServiceLaneRepository extends BaseServiceLaneRepository {
    async persist(serviceLane: ServiceLaneAggregate): Promise<Result> {
        console.log('ServiceLaneRepository');
        for (const event of serviceLane.events) {
            EVENT_HANDLER_REGISTRY[event.constructor.name]?.(
                serviceLane,
                event as any
            );
        }
        return Result.success({});
    }
}
