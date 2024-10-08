import { Event } from '@base/base.event';

type Payload = {
    id: string;
};

export class CarrierDeletedEvent extends Event<Payload> {
    constructor(payload: Payload) {
        super(CarrierDeletedEvent.name, payload);
    }
}
