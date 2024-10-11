import { CarrierAggregate } from '@modules/carrier/domain/aggregates/carrier.aggregate';
import { CarrierIdValueObject } from '@modules/carrier/domain/value-objects/carrier-id.value-object';
import { Error } from '@shared/_common/errors/error';
import { Queryable } from '@shared/_common/interfaces/queryable/queryable';
import { Result } from '@shared/_common/utils/result';
import { MEMORY_DB } from '@shared/vendors/memory/memory.db';

type Args = {
    carrierId: CarrierIdValueObject;
};

export class GetCarrierByIdQueryable implements Queryable<CarrierAggregate> {
    private readonly _args: Args;

    constructor(args: Args) {
        this._args = args;
    }

    async execute(): Promise<Result<CarrierAggregate, Error<any>>> {
        const foundCarrier = MEMORY_DB.Carriers.find((i) =>
            i.id.equalsTo(this._args.carrierId)
        );

        if (!foundCarrier) {
            return Result.fail(Error.notFound());
        }

        return Result.success(foundCarrier);
    }
}
