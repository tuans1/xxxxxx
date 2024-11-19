import { Event } from '@base/base.event';

type Payload = {
    id: string;
    code: string;
    name: string;
    feederTrunk: string;
    sapCrtCode: string;
    status: string;
    effectiveDate: string;
};

export class ServiceLaneCreatedEvent extends Event<Payload> {
    constructor(payload: Payload) {
        super(ServiceLaneCreatedEvent.name, payload);
    }
}
