import { Presentable } from '@shared/_common/interfaces/presentable/presentable';

export class Event<TPayload = any> implements Presentable {
    private readonly _type: string;
    private readonly _payload: TPayload;

    constructor(type: string, payload: TPayload) {
        this._type = type;
        this._payload = payload;
    }

    public get type() {
        return this._type;
    }

    public get payload() {
        return this._payload;
    }

    present() {
        return {
            type: this.type,
            payload: this.payload
        };
    }
}
