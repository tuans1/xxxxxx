import { Error } from '@shared/_common/errors/error';
import {
    ErrorCode,
    ErrorStatusCode,
    ErrorType
} from '@shared/_common/errors/error.definition';

describe(__dirname, () => {
    it('Should return simple error', () => {
        const simpleError = Error.simple('Simple Error');

        expect(simpleError.type).toBeUndefined();
        expect(simpleError.code).toBeUndefined();
        expect(simpleError.statusCode).toBeUndefined();
        expect(simpleError.description).toBe('Simple Error');
        expect(simpleError.data).toBeUndefined();
        expect(simpleError.present()).toEqual({
            code: undefined,
            data: undefined,
            description: 'Simple Error',
            statusCode: undefined,
            type: undefined
        });
    });

    it('Should return not found error with default description', () => {
        const notFoundError = Error.notFound();

        expect(notFoundError.type).toBe(ErrorType.NotFound);
        expect(notFoundError.code).toBe(ErrorCode.NotFound);
        expect(notFoundError.statusCode).toBe(ErrorStatusCode.NotFound);
        expect(notFoundError.description).toBe('Not found');
        expect(notFoundError.data).toBeUndefined();
    });

    it('Should return conflict error with default description', () => {
        const conflictError = Error.conflict();

        expect(conflictError.type).toBe(ErrorType.Conflict);
        expect(conflictError.code).toBe(ErrorCode.Conflict);
        expect(conflictError.statusCode).toBe(ErrorStatusCode.Conflict);
        expect(conflictError.description).toBe('Conflict');
        expect(conflictError.data).toBeUndefined();
    });

    it('Should return bad request error with default description', () => {
        const conflictError = Error.badRequest();

        expect(conflictError.type).toBe(ErrorType.BadRequest);
        expect(conflictError.code).toBe(ErrorCode.BadRequest);
        expect(conflictError.statusCode).toBe(ErrorStatusCode.BadRequest);
        expect(conflictError.description).toBe('Bad Request');
        expect(conflictError.data).toBeUndefined();
    });

    it('Should return server error error with default description', () => {
        const conflictError = Error.serverError();

        expect(conflictError.type).toBe(ErrorType.ServerError);
        expect(conflictError.code).toBe(ErrorCode.ServerError);
        expect(conflictError.statusCode).toBe(ErrorStatusCode.ServerError);
        expect(conflictError.description).toBe('Server Error');
        expect(conflictError.data).toBeUndefined();
    });
});
