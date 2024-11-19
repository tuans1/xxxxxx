import { GetCarrierByIdResult } from '@modules/carrier/application/use-cases/get-carrier-by-id/get-carrier-by-id.result';
import { Presentable } from '@shared/_common/interfaces/presentable/presentable';
import { Result } from '@shared/_common/utils/result';

type PresentSchema = {
    id: string;
    code: string;
    name: string;
};

export class GetCarrierByIdResponse implements Presentable<PresentSchema> {
    private readonly _resultData: Result<GetCarrierByIdResult>['data'];

    constructor(resultData: Result<GetCarrierByIdResult>['data']) {
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
