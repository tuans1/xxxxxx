import { CreateCarrierCommand } from '@modules/carrier/application/use-cases/create-carrier/create-carrier.command';
import { CreateCarrierResult } from '@modules/carrier/application/use-cases/create-carrier/create-carrier.result';
import { GetCarrierByIdQuery } from '@modules/carrier/application/use-cases/get-carrier-by-id/get-carrier-by-id.query';
import { GetCarrierByIdResult } from '@modules/carrier/application/use-cases/get-carrier-by-id/get-carrier-by-id.result';
import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
// import { PresentablePresenter } from '@shared/_common/helpers/presentable-presenter';
import { Result } from '@shared/_common/utils/result';
import { HttpResponseIntercepter } from '@shared/vendors/nestjs/interceptors/http-response.interceptor';
import { CreateCarrierRequest } from '../dtos/create-carrier/create-carrier.request';
import { CreateCarrierResponse } from '../dtos/create-carrier/create-carrier.response';
import { GetCarrierByIdRequest } from '../dtos/get-carrier-by-id/get-carrier-by-id.request';
import { GetCarrierByIdResponse } from '../dtos/get-carrier-by-id/get-carrier-by-id.response';

@Controller('/carriers')
@UseInterceptors(new HttpResponseIntercepter())
export class CarrierController {
    constructor(
        private readonly _commandBus: CommandBus,
        private readonly _queryBus: QueryBus
    ) {}

    @Get('/create-carrier')
    async createCarrier(
        @Query() request: CreateCarrierRequest
    ): Promise<Result<CreateCarrierResponse>> {
        const result: Result<CreateCarrierResult> =
            await this._commandBus.execute(
                new CreateCarrierCommand({
                    carrierCode: request.carrierCode,
                    carrierName: request.carrierName
                })
            );

        if (result.isFail) {
            return Result.fail(result.error);
        }

        return Result.success(new CreateCarrierResponse(result.data));
    }

    @Get('/:carrierId')
    async getCarrierById(
        @Param() request: GetCarrierByIdRequest
    ): Promise<Result<GetCarrierByIdResponse>> {
        const result: Result<GetCarrierByIdResult> =
            await this._queryBus.execute(
                new GetCarrierByIdQuery({
                    carrierId: request.carrierId
                })
            );

        if (result.isFail) {
            return Result.fail(result.error);
        }

        return Result.success(new GetCarrierByIdResponse(result.data));
    }

    @Get('/change-carrier-name')
    changeCarrierName() {
        return 'changeCarrierName';
    }

    @Get('/delete-carrier')
    deleteCarrier() {
        return 'deleteCarrier';
    }
}
