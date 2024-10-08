import { CarrierAggregate } from '@modules/carrier/domain/aggregates/carrier.aggregate';
import {
    CarrierRepository,
    CarrierRepositorySymbol
} from '@modules/carrier/domain/repositories/carrier.repository';
import { CarrierCodeValueObject } from '@modules/carrier/domain/value-objects/carrier-code.value-object';
import { CarrierIdValueObject } from '@modules/carrier/domain/value-objects/carrier-id.value-object';
import { CarrierNameValueObject } from '@modules/carrier/domain/value-objects/carrier-name.value-object';
import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Error } from '@shared/_common/errors/error';
import { Result } from '@shared/_common/utils/result';
import { v4 as Uuid } from 'uuid';
import { CreateCarrierCommand } from './create-carrier.command';
import { CreateCarrierResult } from './create-carrier.result';

@CommandHandler(CreateCarrierCommand)
export class CreateCarrierUseCase
    implements ICommandHandler<CreateCarrierCommand>
{
    constructor(
        @Inject(CarrierRepositorySymbol)
        private readonly _carrierRepository: CarrierRepository,
        private readonly _eventBus: EventBus
    ) {}

    public async execute(
        command: CreateCarrierCommand
    ): Promise<Result<CreateCarrierResult>> {
        console.log('CreateCarrierUseCase', 'execute');

        const createCarrierIdResult = CarrierIdValueObject.create({
            value: Uuid()
        });

        const createCarrierCodeResult = CarrierCodeValueObject.create({
            value: command.args.carrierCode
        });

        const createCarrierNameResult = CarrierNameValueObject.create({
            value: command.args.carrierName
        });

        const errors = [createCarrierCodeResult, createCarrierNameResult]
            .filter((r) => r.isFail)
            .map((r) => r.error);

        if (errors.length > 0) {
            return Result.fail(Error.badRequest(undefined, errors));
        }

        const createCarrierResult = CarrierAggregate.create(
            createCarrierIdResult.data,
            {
                code: createCarrierCodeResult.data,
                name: createCarrierNameResult.data
            }
        );

        if (createCarrierResult.isFail) {
            return Result.fail(Error.badRequest());
        }

        const newCarrier = createCarrierResult.data;

        const persistCarrierResult =
            await this._carrierRepository.persist(newCarrier);

        if (persistCarrierResult.isFail) {
            return Result.fail(Error.serverError());
        }

        for (const event of newCarrier.events) {
            this._eventBus.publish(event);
        }

        return Result.success(
            new CreateCarrierResult({
                id: newCarrier.id.value,
                code: newCarrier.code.value,
                name: newCarrier.name.value
            })
        );
    }
}
