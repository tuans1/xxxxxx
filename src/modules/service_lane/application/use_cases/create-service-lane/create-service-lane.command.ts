import { CreateServiceLaneRequest } from '@ocean-network-express/om-vsm-protobuf/chorus/vsm/service_lane';

export class CreateServiceLaneCommand {
    private readonly _args: CreateServiceLaneRequest;

    constructor(args: CreateServiceLaneRequest) {
        this._args = args;
    }

    public get args() {
        return this._args;
    }
}
