import { Error } from '../errors/error';
import { Result } from './result';

abstract class BaseGuard<TObj> {
    protected readonly _obj: TObj;
    protected readonly _name: string;

    constructor(obj: TObj, name: string) {
        this._obj = obj;
        this._name = name;
    }
}

class GuardAgainst<TObj> extends BaseGuard<TObj> {
    beingNull(): Result<typeof this._obj> {
        if (this._obj === null) {
            return Result.fail(Error.simple(`${this._name} is null`));
        }

        return Result.success(this._obj);
    }

    beingEmpty(): Result<typeof this._obj> {
        if (this._obj === '') {
            return Result.fail(Error.simple(`${this._name} is empty`));
        }

        return Result.success(this._obj);
    }

    hasLengthLessThan(n: number): Result<typeof this._obj> {
        if (typeof this._obj !== 'string' || Array.isArray(this._obj)) {
            return Result.fail(Error.simple(`${this._name} has invalid type`));
        }

        if (this._obj.length < n) {
            return Result.fail(
                Error.simple(`${this._name} has length less than ${n}`)
            );
        }

        return Result.success(this._obj);
    }

    hasLengthGreaterThan(n: number): Result<typeof this._obj> {
        if (typeof this._obj !== 'string' || Array.isArray(this._obj)) {
            return Result.fail(Error.simple(`${this._name} has invalid type`));
        }

        if (this._obj.length > n) {
            return Result.fail(
                Error.simple(`${this._name} has length greater than ${n}`)
            );
        }

        return Result.success(this._obj);
    }
}

class Guard<TObj> extends BaseGuard<TObj> {
    private readonly _against: GuardAgainst<TObj>;

    constructor(obj: TObj, name: string) {
        super(obj, name);
        this._against = new GuardAgainst(obj, name);
    }

    public get against() {
        return this._against;
    }
}

export function guard<TObj>(obj: TObj, name: string = 'Object') {
    return new Guard<TObj>(obj, name);
}
