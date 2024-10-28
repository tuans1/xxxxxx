import { CreateServiceLaneCommand } from '@modules/service_lane/application/use_cases/create-service-lane/create-service-lane.command';
import { CreateServiceLaneResult } from '@modules/service_lane/application/use_cases/create-service-lane/create-service-lane.result';
import { GetListServiceLaneQuery } from '@modules/service_lane/application/use_cases/list-service-lane/get-service-lane.query';
import { GetListServiceLaneResult } from '@modules/service_lane/application/use_cases/list-service-lane/get-service-lane.result';
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
// import { PresentablePresenter } from '@shared/_common/helpers/presentable-presenter';
import { Result } from '@shared/_common/utils/result';
import { HttpResponseIntercepter } from '@shared/vendors/nestjs/interceptors/http-response.interceptor';
import { CreateServiceLaneRequest } from '../dtos/create-service-lane/create-service-lane.request';
import { CreateServiceLaneResponse } from '../dtos/create-service-lane/create-service-lane.response';
import { GetListServiceLaneResponse } from '../dtos/get-list-service-lane/get-list-service-lane.response';

@Controller('/service-lane')
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
                    code: request.slCode,
                    name: request.slName
                })
            );

        if (result.isFail) {
            return Result.fail(result.error);
        }
        return Result.success(new CreateServiceLaneResponse(result.data));
    }

    @Get('/list-service-lane')
    async getListServiceLane() // @Param() request: GetListServiceLaneRequest
    : Promise<Result<GetListServiceLaneResponse>> {
        const result: Result<GetListServiceLaneResult> =
            await this._queryBus.execute(new GetListServiceLaneQuery({}));

        if (result.isFail) {
            return Result.fail(result.error);
        }
        return Result.success(new GetListServiceLaneResponse(result.data));
    }
}
