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
        for (const entity of this._data) {
            console.log(entity.code.value, '---entity');
            // listServiceLane.push(result.data);
        }

        return this._data.map((data) => {
            return {
                code: data.code.value,
                name: data.name.value,
                id: data.id.value
            };
        });
    }
}
