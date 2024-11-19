import { GetListServiceLaneResult } from '@modules/service_lane/application/use_cases/list-service-lane/get-service-lane.result';
import { Presentable } from '@shared/_common/interfaces/presentable/presentable';
import { Result } from '@shared/_common/utils/result';

export class GetListServiceLaneResponse implements Presentable {
    private readonly _resultData: Result<GetListServiceLaneResult>['data'];

    constructor(resultData: Result<GetListServiceLaneResult>['data']) {
        this._resultData = resultData;
    }

    present() {
        console.log('CACACACAC');
        return this._resultData;
    }
}
