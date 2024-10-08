import { CreateCarrierCommand } from '@modules/carrier/application/use-cases/create-carrier/create-carrier.command';
import { CreateCarrierResult } from '@modules/carrier/application/use-cases/create-carrier/create-carrier.result';
import { Controller, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { PresentablePresenter } from '@shared/_common/helpers/presentable-presenter';
import { Result } from '@shared/_common/utils/result';

@Controller('/carriers')
export class CarrierController {
    constructor(private readonly _commandBus: CommandBus) {}

    @Get('/create-carrier')
    async createCarrier() {
        const result: Result<CreateCarrierResult> =
            await this._commandBus.execute(
                new CreateCarrierCommand({
                    carrierCode: '1111',
                    carrierName: '1111'
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
