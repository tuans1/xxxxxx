import { ServiceLaneAggregate } from '@modules/service_lane/domain/aggregates/service-lane.aggregate';
import { ServiceLaneIdValueObject } from '@modules/service_lane/domain/value-objects/service-lane-id.value-object';
import { Error } from '@shared/_common/errors/error';
import { Queryable } from '@shared/_common/interfaces/queryable/queryable';
import { Result } from '@shared/_common/utils/result';
import { MEMORY_DB } from '@shared/vendors/memory/memory.db';

type Args = {
    serviceLaneId: ServiceLaneIdValueObject;
};

export class GetServiceLaneByIdQueryable
    implements Queryable<ServiceLaneAggregate>
{
    private readonly _args: Args;

    constructor(args: Args) {
        this._args = args;
    }

    async execute(): Promise<Result<ServiceLaneAggregate, Error<any>>> {
        const foundServiceLane = MEMORY_DB.ServiceLanes.find((i) =>
            i.id.equalsTo(this._args.serviceLaneId)
        );

        if (!foundServiceLane) {
            return Result.fail(Error.notFound());
        }

        return Result.success(foundServiceLane);
    }
}
