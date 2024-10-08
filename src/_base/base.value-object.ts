import { Presentable } from '@shared/_common/interfaces/presentable/presentable';

export abstract class ValueObject<TProps> implements Presentable {
    protected _props: TProps;

    protected constructor(props: TProps) {
        this._props = props;
    }

    equalsTo(other: ValueObject<TProps>) {
        return JSON.stringify(this) === JSON.stringify(other);
    }

    abstract present();
}
