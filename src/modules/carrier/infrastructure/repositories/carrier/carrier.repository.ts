import { CarrierAggregate } from '@modules/carrier/domain/aggregates/carrier.aggregate';
import { CarrierRepository as BaseCarrierRepository } from '@modules/carrier/domain/repositories/carrier/carrier.repository';
import { Result } from '@shared/_common/utils/result';
import { EVENT_HANDLER_REGISTRY } from './event-handlers/event-handler.registry';

export class CarrierRepository extends BaseCarrierRepository {
    async persist(carrier: CarrierAggregate): Promise<Result> {
        for (const event of carrier.events) {
            EVENT_HANDLER_REGISTRY[event.constructor.name]?.(
                carrier,
                event as any
            );
        }

        return Result.success({});
    }
}
