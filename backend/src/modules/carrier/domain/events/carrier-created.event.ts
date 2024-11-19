import { Event } from '@base/base.event';

type Payload = {
    id: string;
    code: string;
    name: string;
};

export class CarrierCreatedEvent extends Event<Payload> {
    constructor(payload: Payload) {
        super(CarrierCreatedEvent.name, payload);
    }
}
