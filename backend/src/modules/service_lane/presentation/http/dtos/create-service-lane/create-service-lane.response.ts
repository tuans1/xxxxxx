import { CreateServiceLaneResult } from '@modules/service_lane/application/use_cases/create-service-lane/create-service-lane.result';
import { Presentable } from '@shared/_common/interfaces/presentable/presentable';
import { Result } from '@shared/_common/utils/result';

type PresentSchema = {
    id: string;
    code: string;
    name: string;
};

export class CreateServiceLaneResponse implements Presentable<PresentSchema> {
    private readonly _resultData: Result<CreateServiceLaneResult>['data'];

    constructor(resultData: Result<CreateServiceLaneResult>['data']) {
        this._resultData = resultData;
    }

    present(): PresentSchema {
        return {
            id: this._resultData.data.id,
            code: this._resultData.data.code,
            name: this._resultData.data.name
        };
    }
}
