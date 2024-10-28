import { ServiceLaneAggregate } from '@modules/service_lane/domain/aggregates/service-lane.aggregate';
import { ServiceLaneCodeValueObject } from '@modules/service_lane/domain/value-objects/service-lane-code.value-object';
import { ServiceLaneIdValueObject } from '@modules/service_lane/domain/value-objects/service-lane-id.value-object';
import { ServiceLaneNameValueObject } from '@modules/service_lane/domain/value-objects/service-lane-name.value-object';
import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Error } from '@shared/_common/errors/error';
import { Result } from '@shared/_common/utils/result';
import {
    UnitOfWorkServiceLane,
    UnitOfWorkServiceLaneSymbol
} from '@shared/domain/uof-service-lane';
import { v4 as Uuid } from 'uuid';
import { CreateServiceLaneCommand } from './create-service-lane.command';
import { CreateServiceLaneResult } from './create-service-lane.result';

@CommandHandler(CreateServiceLaneCommand)
export class CreateServiceLaneUseCase2
    implements ICommandHandler<CreateServiceLaneCommand>
{
    constructor(
        @Inject(UnitOfWorkServiceLaneSymbol)
        private readonly _unitOfWork: UnitOfWorkServiceLane,
        private readonly _eventBus: EventBus
    ) {}

    public async execute(
        command: CreateServiceLaneCommand
    ): Promise<Result<CreateServiceLaneResult>> {
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

        const createServiceLaneResult = ServiceLaneAggregate.create(
            createCarrierIdResult.data,
            {
                code: createCarrierCodeResult.data,
                name: createCarrierNameResult.data
            }
        );
        if (createServiceLaneResult.isFail) {
            return Result.fail(Error.badRequest());
        }

        const newServiceLane = createServiceLaneResult.data;
        const startTransactionResult =
            await this._unitOfWork.startTransaction();
        if (startTransactionResult.isFail) {
            console.log('---startTransactionResult.isFail');
            return Result.fail(Error.serverError());
        }

        const persistCarrierResult =
            await this._unitOfWork.serviceLaneRepository.persist(
                newServiceLane
            );
        console.log('persistCarrierResult', persistCarrierResult);

        if (persistCarrierResult.isFail) {
            console.log(
                persistCarrierResult.isFail,
                '---persistCarrierResult.isFail'
            );

            await this._unitOfWork.rollbackTransaction();
            return Result.fail(Error.serverError());
        }
        const commitTransactionResult =
            await this._unitOfWork.commitTransaction();

        if (commitTransactionResult.isFail) {
            return Result.fail(Error.serverError());
        }

        for (const event of newServiceLane.events) {
            this._eventBus.publish(event);
        }

        return Result.success(
            new CreateServiceLaneResult({
                id: newServiceLane.id.value,
                code: newServiceLane.code.value,
                name: newServiceLane.name.value
            })
        );
    }
}
