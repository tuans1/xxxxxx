import {
    ServiceLaneQueryableFactory,
    ServiceLaneQueryableFactorySymbol
} from '@modules/service_lane/domain/repositories/service-lane/service-lane.queryable-factory';
import {
    ServiceLaneRepository,
    ServiceLaneRepositorySymbol
} from '@modules/service_lane/domain/repositories/service-lane/service-lane.repository';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Result } from '@shared/_common/utils/result';
import { GetListServiceLaneQuery } from './get-service-lane.query';
import { GetListServiceLaneResult } from './get-service-lane.result';

@QueryHandler(GetListServiceLaneQuery)
export class GetListServiceLaneUseCase
    implements IQueryHandler<GetListServiceLaneQuery>
{
    constructor(
        @Inject(ServiceLaneRepositorySymbol)
        private readonly _carrierRepository: ServiceLaneRepository,

        @Inject(ServiceLaneQueryableFactorySymbol)
        private readonly _carrierQueryableFactory: ServiceLaneQueryableFactory
    ) {}

    public async execute(
        query: GetListServiceLaneQuery
    ): Promise<Result<GetListServiceLaneResult>> {
        const listServiceLaneResult = await this._carrierRepository.queryBy(
            this._carrierQueryableFactory.createGetListServiceLaneQueryable(
                query.args
            )
        );

        if (listServiceLaneResult.isFail) {
            return Result.fail(listServiceLaneResult.error);
        }

        return Result.success(
            new GetListServiceLaneResult(listServiceLaneResult.data)
        );
    }
}
