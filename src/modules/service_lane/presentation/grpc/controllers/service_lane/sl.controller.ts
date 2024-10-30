// import { CreateServiceLaneCommand } from '@modules/service_lane/application/use_cases/create-service-lane/create-service-lane.command';
// import { CreateServiceLaneResult } from '@modules/service_lane/application/use_cases/create-service-lane/create-service-lane.result';
import { CreateServiceLaneCommand } from '@modules/service_lane/application/use_cases/create-service-lane/create-service-lane.command';
import { CreateServiceLaneResult } from '@modules/service_lane/application/use_cases/create-service-lane/create-service-lane.result';
import { GetListServiceLaneQuery } from '@modules/service_lane/application/use_cases/list-service-lane/get-service-lane.query';
import { GetListServiceLaneResult } from '@modules/service_lane/application/use_cases/list-service-lane/get-service-lane.result';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
    CreateServiceLaneRequest,
    GetListServiceLaneRequest,
    VsmServiceLaneServiceController,
    VsmServiceLaneServiceControllerMethods
} from '@ocean-network-express/om-vsm-protobuf/chorus/vsm/service_lane';
import { Result } from '@shared/_common/utils/result';

@Controller()
@VsmServiceLaneServiceControllerMethods()
export class ServiceLaneController implements VsmServiceLaneServiceController {
    constructor(
        private readonly _commandBus: CommandBus,
        private readonly _queryBus: QueryBus
    ) {}
    async listServiceLane(request: GetListServiceLaneRequest): Promise<Result> {
        const result: Result<GetListServiceLaneResult> =
            await this._queryBus.execute(
                new GetListServiceLaneQuery({ keyword: request.keyword })
            );

        if (result.isFail) {
            return Result.fail(result.error);
        }

        return Result.success(result.data.present());
    }

    async createServiceLane(
        request: CreateServiceLaneRequest
    ): Promise<Result> {
        const result: Result<CreateServiceLaneResult> =
            await this._commandBus.execute(
                new CreateServiceLaneCommand(request)
            );
        if (result.isFail) {
            return Result.fail(result.error);
        }
        return Result.success(result.data.data);
    }
}
