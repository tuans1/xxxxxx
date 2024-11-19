import { Error } from '../errors/error';
import { Presentable } from '../interfaces/presentable/presentable';

export class Result<TData = any, TError = Error> implements Presentable {
    private readonly _isSuccess: boolean;
    private readonly _data?: TData;
    private readonly _error?: TError;

    private constructor(isSuccess: boolean, data?: TData, error?: TError) {
        this._isSuccess = isSuccess;
        this._data = data;
        this._error = error;
    }

    public get isSuccess() {
        return this._isSuccess;
    }

    public get isFail() {
        return !this._isSuccess;
    }

    public get data() {
        return this._data;
    }

    public get error() {
        return this._error;
    }

    public present() {
        return {
            isSuccess: this.isSuccess,
            error: this.error,
            data: this.data
        };
    }

    public static success<TData, TError>(data: TData) {
        return new Result<TData, TError>(true, data, undefined);
    }

    public static fail<TData, TError>(error: TError) {
        return new Result<TData, TError>(false, undefined, error);
    }
}
