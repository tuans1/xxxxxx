import { Presentable } from '@shared/_common/interfaces/presentable/presentable';

type Data = {
    id: string;
    code: string;
    name: string;
    feederTrunk: string;
    sapCrtCode: string;
    effectiveDate: string;
    status: string;
};

export class CreateServiceLaneResult implements Presentable {
    private readonly _data: Data;

    constructor(data: Data) {
        this._data = data;
    }

    public get data() {
        return this._data;
    }

    present() {
        return {
            id: this._data.id,
            code: this._data.code,
            name: this._data.name,
            feederTrunk: this._data.feederTrunk,
            sapCrtCode: this._data.sapCrtCode,
            effectiveDate: this._data.effectiveDate,
            status: this._data.status
        };
    }
}
