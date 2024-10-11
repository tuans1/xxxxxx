import { CreateCarrierResult } from '@modules/carrier/application/use-cases/create-carrier/create-carrier.result';
import { Presentable } from '@shared/_common/interfaces/presentable/presentable';
import { Result } from '@shared/_common/utils/result';

type PresentSchema = {
    id: string;
    code: string;
    name: string;
};

export class CreateCarrierResponse implements Presentable<PresentSchema> {
    private readonly _resultData: Result<CreateCarrierResult>['data'];

    constructor(resultData: Result<CreateCarrierResult>['data']) {
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
