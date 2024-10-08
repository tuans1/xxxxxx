import { Presentable } from '@shared/_common/interfaces/presentable/presentable';

export abstract class Entity<TId, TProps> implements Presentable {
    protected _id: TId;
    protected _props: TProps;

    protected constructor(id: TId, props: TProps) {
        this._id = id;
        this._props = props;
    }

    public get id() {
        return this._id;
    }

    abstract present();
}
