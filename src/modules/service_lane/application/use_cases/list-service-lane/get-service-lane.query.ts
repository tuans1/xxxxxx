import { GetListServiceLaneRequest } from '@ocean-network-express/om-vsm-protobuf/chorus/vsm/service_lane';

export class GetListServiceLaneQuery {
    private readonly _args: GetListServiceLaneRequest;

    constructor(args: GetListServiceLaneRequest) {
        this._args = args;
    }

    public get args() {
        return this._args;
    }
}
