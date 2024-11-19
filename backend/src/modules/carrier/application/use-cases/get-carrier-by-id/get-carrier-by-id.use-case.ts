import {
    CarrierQueryableFactory,
    CarrierQueryableFactorySymbol
} from '@modules/carrier/domain/repositories/carrier/carrier.queryable-factory';
import {
    CarrierRepository,
    CarrierRepositorySymbol
} from '@modules/carrier/domain/repositories/carrier/carrier.repository';
import { CarrierIdValueObject } from '@modules/carrier/domain/value-objects/carrier-id.value-object';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Error } from '@shared/_common/errors/error';
import { Result } from '@shared/_common/utils/result';
import { GetCarrierByIdQuery } from './get-carrier-by-id.query';
import { GetCarrierByIdResult } from './get-carrier-by-id.result';

@QueryHandler(GetCarrierByIdQuery)
export class GetCarrierByIdUseCase
    implements IQueryHandler<GetCarrierByIdQuery>
{
    constructor(
        @Inject(CarrierRepositorySymbol)
        private readonly _carrierRepository: CarrierRepository,

        @Inject(CarrierQueryableFactorySymbol)
        private readonly _carrierQueryableFactory: CarrierQueryableFactory
    ) {}

    public async execute(
        query: GetCarrierByIdQuery
    ): Promise<Result<GetCarrierByIdResult>> {
        console.log('GetCarrierByIdUseCase', 'execute');

        const createCarrierIdResult = CarrierIdValueObject.create({
            value: query.args.carrierId
        });

        if (createCarrierIdResult.isFail) {
            return Result.fail(
                Error.badRequest(undefined, createCarrierIdResult.error)
            );
        }

        const getCarrierByIdResult = await this._carrierRepository.queryBy(
            this._carrierQueryableFactory.createGetCarrierByIdQueryable(
                createCarrierIdResult.data
            )
        );

        if (getCarrierByIdResult.isFail) {
            return Result.fail(getCarrierByIdResult.error);
        }

        return Result.success(
            new GetCarrierByIdResult({
                id: getCarrierByIdResult.data.id.value,
                code: getCarrierByIdResult.data.code.value,
                name: getCarrierByIdResult.data.name.value
            })
        );
    }
}
