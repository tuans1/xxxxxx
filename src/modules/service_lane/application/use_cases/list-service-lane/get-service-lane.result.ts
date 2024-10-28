import { ServiceLaneAggregate } from '@modules/service_lane/domain/aggregates/service-lane.aggregate';
import { Presentable } from '@shared/_common/interfaces/presentable/presentable';

export class GetListServiceLaneResult implements Presentable {
    private readonly _data: ServiceLaneAggregate[];

    constructor(data: ServiceLaneAggregate[]) {
        this._data = data;
    }

    public get data() {
        return this._data;
    }

    present() {
        console.log('22222222222222');
        return this._data;
    }
}
