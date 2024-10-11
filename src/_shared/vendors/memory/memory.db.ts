import { CarrierAggregate } from '@modules/carrier/domain/aggregates/carrier.aggregate';

type Schema = {
    Carriers: CarrierAggregate[];
};

export const MEMORY_DB: Schema = {
    Carriers: []
};
