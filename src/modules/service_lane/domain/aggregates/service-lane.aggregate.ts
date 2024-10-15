import { AggregateRoot } from '@base/base.aggregate-root';
import { Result } from '@shared/_common/utils/result';
import { ServiceLaneCreatedEvent } from '../events/service-lane-created.event';
import { ServiceLaneCodeValueObject } from '../value-objects/service-lane-code.value-object';
import { ServiceLaneIdValueObject } from '../value-objects/service-lane-id.value-object';
import { ServiceLaneNameValueObject } from '../value-objects/service-lane-name.value-object';

type Props = {
    name: ServiceLaneNameValueObject;
    code: ServiceLaneCodeValueObject;
};

type Event = ServiceLaneCreatedEvent;

export class ServiceLaneAggregate extends AggregateRoot<
    ServiceLaneIdValueObject,
    Props,
    Event
> {
    public get code() {
        return this._props.code;
    }

    public get name() {
        return this._props.name;
    }

    public present() {
        return {
            id: this._id.present(),
            code: this._props.code.present(),
            name: this._props.name.present()
        };
    }

    public static create(
        id: ServiceLaneIdValueObject,
        props: Props
    ): Result<ServiceLaneAggregate> {
        console.log('Create Aggregate');
        const serviceLaneAggregate = new ServiceLaneAggregate(id, props);

        serviceLaneAggregate._events.push(
            new ServiceLaneCreatedEvent({
                id: id.value,
                code: props.code.value,
                name: props.name.value
            })
        );

        return Result.success(serviceLaneAggregate);
    }

    // public static createFromPersistant(
    //     id: ServiceLaneIdValueObject,
    //     props: Props
    // ): Result<ServiceLaneAggregate> {
    //     const carrierAggregate = new ServiceLaneAggregate(id, props);

    //     return Result.success(carrierAggregate);
    // }
}
