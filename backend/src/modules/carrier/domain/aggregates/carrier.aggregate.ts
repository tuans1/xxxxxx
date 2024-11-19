import { AggregateRoot } from '@base/base.aggregate-root';
import { Result } from '@shared/_common/utils/result';
import { CarrierCreatedEvent } from '../events/carrier-created.event';
import { CarrierDeletedEvent } from '../events/carrier-deleted.event';
import { CarrierNameChangedEvent } from '../events/carrier-name-changed.event';
import { CarrierCodeValueObject } from '../value-objects/carrier-code.value-object';
import { CarrierIdValueObject } from '../value-objects/carrier-id.value-object';
import { CarrierNameValueObject } from '../value-objects/carrier-name.value-object';

type Props = {
    name: CarrierNameValueObject;
    code: CarrierCodeValueObject;
};

type Event =
    | CarrierCreatedEvent
    | CarrierNameChangedEvent
    | CarrierDeletedEvent;

export class CarrierAggregate extends AggregateRoot<
    CarrierIdValueObject,
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

    public changeName(newName: CarrierNameValueObject) {
        this._props.name = newName;
        this._events.push(
            new CarrierNameChangedEvent({
                id: this._id.value,
                name: this._props.name.value
            })
        );
    }

    public delete() {
        this._events.push(
            new CarrierDeletedEvent({
                id: this._id.value
            })
        );
    }

    public static create(
        id: CarrierIdValueObject,
        props: Props
    ): Result<CarrierAggregate> {
        const carrierAggregate = new CarrierAggregate(id, props);

        carrierAggregate._events.push(
            new CarrierCreatedEvent({
                id: id.value,
                code: props.code.value,
                name: props.name.value
            })
        );

        return Result.success(carrierAggregate);
    }

    public static createFromPersistant(
        id: CarrierIdValueObject,
        props: Props
    ): Result<CarrierAggregate> {
        const carrierAggregate = new CarrierAggregate(id, props);
        return Result.success(carrierAggregate);
    }
}
