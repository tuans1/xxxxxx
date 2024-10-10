import { CreateCarrierCommand } from '@modules/carrier/application/use-cases/create-carrier/create-carrier.command';
import { CreateCarrierResult } from '@modules/carrier/application/use-cases/create-carrier/create-carrier.result';
import { Controller, Get, Query } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { PresentablePresenter } from '@shared/_common/helpers/presentable-presenter';
import { Result } from '@shared/_common/utils/result';
import { CreateCarrierRequest } from '../dtos/create-carrier.request';

@Controller('/carriers')
export class CarrierController {
    constructor(private readonly _commandBus: CommandBus) {}

    @Get('/create-carrier')
    async createCarrier(@Query() request: CreateCarrierRequest) {
        console.log(request);

        const result: Result<CreateCarrierResult> =
            await this._commandBus.execute(
                new CreateCarrierCommand({
                    carrierCode: request.carrierCode,
                    carrierName: request.carrierName
                })
            );

        return PresentablePresenter.presentAllPresentableFromObj(result);
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
