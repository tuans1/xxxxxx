import { Queryable } from '@shared/_common/interfaces/queryable/queryable';
import { Result } from '@shared/_common/utils/result';
import { ServiceLaneAggregate } from '../../aggregates/service-lane.aggregate';

export abstract class ServiceLaneRepository {
    async queryBy<
        TReturn extends ServiceLaneAggregate | ServiceLaneAggregate[]
    >(queryable: Queryable<TReturn>): Promise<Result<TReturn>> {
        return await queryable.execute();
    }

    abstract persist(serviceLane: ServiceLaneAggregate): Promise<Result>;
}

export const ServiceLaneRepositorySymbol = Symbol('ServiceLaneRepository');
