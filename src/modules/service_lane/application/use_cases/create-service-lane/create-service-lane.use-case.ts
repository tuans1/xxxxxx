import { ServiceLaneAggregate } from '@modules/service_lane/domain/aggregates/service-lane.aggregate';
import {
    ServiceLaneRepository,
    ServiceLaneRepositorySymbol
} from '@modules/service_lane/domain/repositories/service-lane/service-lane.repository';
import { ServiceLaneCodeValueObject } from '@modules/service_lane/domain/value-objects/service-lane-code.value-object';
import { ServiceLaneIdValueObject } from '@modules/service_lane/domain/value-objects/service-lane-id.value-object';
import { ServiceLaneNameValueObject } from '@modules/service_lane/domain/value-objects/service-lane-name.value-object';
import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Error } from '@shared/_common/errors/error';
import { Result } from '@shared/_common/utils/result';
import { v4 as Uuid } from 'uuid';
import { CreateServiceLaneCommand } from './create-service-lane.command';
import { CreateServiceLaneResult } from './create-service-lane.result';

@CommandHandler(CreateServiceLaneCommand)
export class CreateServiceLaneUseCase
    implements ICommandHandler<CreateServiceLaneCommand>
{
    constructor(
        @Inject(ServiceLaneRepositorySymbol)
        private readonly _carrierRepository: ServiceLaneRepository,
        private readonly _eventBus: EventBus
    ) {}

    public async execute(
        command: CreateServiceLaneCommand
    ): Promise<Result<CreateServiceLaneResult>> {
        console.log('CreateServiceLaneUseCase', 'execute');

        const createCarrierIdResult = ServiceLaneIdValueObject.create({
            value: Uuid()
        });

        const createCarrierCodeResult = ServiceLaneCodeValueObject.create({
            value: command.args.code
        });

        const createCarrierNameResult = ServiceLaneNameValueObject.create({
            value: command.args.name
        });

        const errors = [createCarrierCodeResult, createCarrierNameResult]
            .filter((r) => r.isFail)
            .map((r) => r.error);

        if (errors.length > 0) {
            return Result.fail(Error.badRequest(undefined, errors));
        }

        const createCarrierResult = ServiceLaneAggregate.create(
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
        console.log(
            '---app-use-case',
            new CreateServiceLaneResult({
                id: newCarrier.id.value,
                code: newCarrier.code.value,
                name: newCarrier.name.value
            })
        );
        return Result.success(
            new CreateServiceLaneResult({
                id: newCarrier.id.value,
                code: newCarrier.code.value,
                name: newCarrier.name.value
            })
        );
    }
}
