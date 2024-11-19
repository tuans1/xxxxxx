import { Queryable } from '@shared/_common/interfaces/queryable/queryable';
import { Result } from '@shared/_common/utils/result';
import { CarrierAggregate } from '../../aggregates/carrier.aggregate';

export abstract class CarrierRepository {
    async queryBy<TReturn extends CarrierAggregate | CarrierAggregate[]>(
        queryable: Queryable<TReturn>
    ): Promise<Result<TReturn>> {
        return await queryable.execute();
    }

    abstract persist(carrier: CarrierAggregate): Promise<Result>;
}

export const CarrierRepositorySymbol = Symbol('CarrierRepository');
