import { Event } from '@base/base.event';

type Payload = {
    id: string;
    name: string;
};

export class CarrierNameChangedEvent extends Event<Payload> {
    constructor(payload: Payload) {
        super(CarrierNameChangedEvent.name, payload);
    }
}
