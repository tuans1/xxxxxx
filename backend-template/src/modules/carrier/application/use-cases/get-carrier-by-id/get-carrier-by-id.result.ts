import { Presentable } from '@shared/_common/interfaces/presentable/presentable';

type Data = {
    id: string;
    code: string;
    name: string;
};

export class GetCarrierByIdResult implements Presentable {
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
            name: this._data.name
        };
    }
}
