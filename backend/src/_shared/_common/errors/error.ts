import { Presentable } from '../interfaces/presentable/presentable';
import { ErrorCode, ErrorStatusCode, ErrorType } from './error.definition';

type Props<TData> = {
    type?: ErrorType;
    code?: ErrorCode;
    statusCode?: ErrorStatusCode;
    description?: string;
    data?: TData;
};

export class Error<TData = any> implements Presentable {
    private readonly _props: Props<TData>;

    private constructor(props: Props<TData>) {
        this._props = props;
    }

    public get type() {
        return this._props.type;
    }

    public get code() {
        return this._props.code;
    }

    public get statusCode() {
        return this._props.statusCode;
    }

    public get description() {
        return this._props.description;
    }

    public get data() {
        return this._props.data;
    }

    public present() {
        return {
            type: this.type,
            code: this.code,
            statusCode: this.statusCode,
            description: this.description,
            data: this.data
        };
    }

    public static simple<TData>(description: string, data?: TData) {
        return new Error({ description, data });
    }

    public static notFound<TData>(
        description: string = 'Not found',
        data?: TData
    ) {
        return new Error({
            type: ErrorType.NotFound,
            code: ErrorCode.NotFound,
            statusCode: ErrorStatusCode.NotFound,
            description,
            data
        });
    }

    public static conflict<TData>(
        description: string = 'Conflict',
        data?: TData
    ) {
        return new Error({
            type: ErrorType.Conflict,
            code: ErrorCode.Conflict,
            statusCode: ErrorStatusCode.Conflict,
            description,
            data
        });
    }

    public static badRequest<TData>(
        description: string = 'Bad Request',
        data?: TData
    ) {
        return new Error({
            type: ErrorType.BadRequest,
            code: ErrorCode.BadRequest,
            statusCode: ErrorStatusCode.BadRequest,
            description,
            data
        });
    }

    public static serverError<TData>(
        description: string = 'Server Error',
        data?: TData
    ) {
        return new Error({
            type: ErrorType.ServerError,
            code: ErrorCode.ServerError,
            statusCode: ErrorStatusCode.ServerError,
            description,
            data
        });
    }
}
