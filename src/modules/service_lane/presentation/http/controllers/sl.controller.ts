import { CreateServiceLaneCommand } from '@modules/service_lane/application/use_cases/create-service-lane/create-service-lane.command';
import { CreateServiceLaneResult } from '@modules/service_lane/application/use_cases/create-service-lane/create-service-lane.result';
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
// import { PresentablePresenter } from '@shared/_common/helpers/presentable-presenter';
import { Result } from '@shared/_common/utils/result';
import { HttpResponseIntercepter } from '@shared/vendors/nestjs/interceptors/http-response.interceptor';
import { CreateServiceLaneRequest } from '../dtos/create-carrier/create-service-lane.request';
import { CreateServiceLaneResponse } from '../dtos/create-carrier/create-service-lane.response';

@Controller('/service_lane')
@UseInterceptors(new HttpResponseIntercepter())
export class ServiceLaneController {
    constructor(
        private readonly _commandBus: CommandBus,
        private readonly _queryBus: QueryBus
    ) {}

    @Get('')
    test() {
        return 1;
    }

    @Get('/create')
    async createServiceLane(
        @Query() request: CreateServiceLaneRequest
    ): Promise<Result<CreateServiceLaneResponse>> {
        const result: Result<CreateServiceLaneResult> =
            await this._commandBus.execute(
                new CreateServiceLaneCommand({
                    slCode: request.slCode,
                    slName: request.slName
                })
            );

        if (result.isFail) {
            return Result.fail(result.error);
        }
        return Result.success(new CreateServiceLaneResponse(result.data));
    }

    // @Get('/:carrierId')
    // async getCarrierById(
    //     @Param() request: GetCarrierByIdRequest
    // ): Promise<Result<GetCarrierByIdResponse>> {
    //     const result: Result<GetCarrierByIdResult> =
    //         await this._queryBus.execute(
    //             new GetCarrierByIdQuery({
    //                 carrierId: request.carrierId
    //             })
    //         );

    //     if (result.isFail) {
    //         return Result.fail(result.error);
    //     }

    //     return Result.success(new GetCarrierByIdResponse(result.data));
    // }

    // @Get('/change-carrier-name')
    // changeCarrierName() {
    //     return 'changeCarrierName';
    // }

    // @Get('/delete-carrier')
    // deleteCarrier() {
    //     return 'deleteCarrier';
    // }
}
