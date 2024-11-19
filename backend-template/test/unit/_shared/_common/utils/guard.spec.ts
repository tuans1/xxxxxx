import { guard } from '@shared/_common/utils/guard';

describe(__dirname, () => {
    describe('guard against being null', () => {
        it('Should return fail result when object is null', () => {
            const nullObj = null;
            const result = guard(nullObj, 'TestObj').against.beingNull();

            expect(result.isFail).toBe(true);
            expect(result.isSuccess).toBe(false);
            expect(result.error).not.toBeUndefined();
            expect(result.data).toBeUndefined();
        });

        it('Should return ok result when object is not null', () => {
            const notNullObj = 'not null';
            const result = guard(notNullObj, 'TestObj').against.beingNull();

            expect(result.isFail).toBe(false);
            expect(result.isSuccess).toBe(true);
            expect(result.error).toBeUndefined();
            expect(result.data).not.toBeUndefined();
        });
    });

    describe('guard against being empty', () => {
        it('Should return fail result when object is empty', () => {
            const emptyObj = '';
            const result = guard(emptyObj, 'TestObj').against.beingEmpty();

            expect(result.isFail).toBe(true);
            expect(result.isSuccess).toBe(false);
            expect(result.error).not.toBeUndefined();
            expect(result.data).toBeUndefined();
        });

        it('Should return ok result when object is not empty', () => {
            const notEmptyObj = 'not empty';
            const result = guard(notEmptyObj, 'TestObj').against.beingEmpty();

            expect(result.isFail).toBe(false);
            expect(result.isSuccess).toBe(true);
            expect(result.error).toBeUndefined();
            expect(result.data).not.toBeUndefined();
        });
    });

    describe('guard against has length greater than n', () => {
        it('Should return fail result when object is not string', () => {
            const expectedLength = 5;
            const notStringObj = 0;
            const result = guard(
                notStringObj,
                'TestObj'
            ).against.hasLengthGreaterThan(expectedLength);

            expect(result.isFail).toBe(true);
            expect(result.isSuccess).toBe(false);
            expect(result.error).not.toBeUndefined();
            expect(result.data).toBeUndefined();
        });

        it('Should return fail result when object is not array', () => {
            const expectedLength = 5;
            const notArrayObj = 0;
            const result = guard(
                notArrayObj,
                'TestObj'
            ).against.hasLengthGreaterThan(expectedLength);

            expect(result.isFail).toBe(true);
            expect(result.isSuccess).toBe(false);
            expect(result.error).not.toBeUndefined();
            expect(result.data).toBeUndefined();
        });

        it('Should return fail result when object has length greater than n', () => {
            const expectedLength = 5;
            const objHasLengthGreaterThanN = '123456';
            const result = guard(
                objHasLengthGreaterThanN,
                'TestObj'
            ).against.hasLengthGreaterThan(expectedLength);

            expect(result.isFail).toBe(true);
            expect(result.isSuccess).toBe(false);
            expect(result.error).not.toBeUndefined();
            expect(result.data).toBeUndefined();
        });

        it('Should return ok result when object has length less than n', () => {
            const expectedLength = 5;
            const validObj = '1';
            const result = guard(
                validObj,
                'TestObj'
            ).against.hasLengthGreaterThan(expectedLength);

            expect(result.isFail).toBe(false);
            expect(result.isSuccess).toBe(true);
            expect(result.error).toBeUndefined();
            expect(result.data).not.toBeUndefined();
        });
    });

    describe('guard against has length less than n', () => {
        it('Should return fail result when object is not string', () => {
            const expectedLength = 5;
            const notStringObj = 0;
            const result = guard(
                notStringObj,
                'TestObj'
            ).against.hasLengthLessThan(expectedLength);

            expect(result.isFail).toBe(true);
            expect(result.isSuccess).toBe(false);
            expect(result.error).not.toBeUndefined();
            expect(result.data).toBeUndefined();
        });

        it('Should return fail result when object is not array', () => {
            const expectedLength = 5;
            const notArrayObj = 0;
            const result = guard(
                notArrayObj,
                'TestObj'
            ).against.hasLengthLessThan(expectedLength);

            expect(result.isFail).toBe(true);
            expect(result.isSuccess).toBe(false);
            expect(result.error).not.toBeUndefined();
            expect(result.data).toBeUndefined();
        });

        it('Should return fail result when object has length less than n', () => {
            const expectedLength = 5;
            const objHasLengthGreaterThanN = '1234';
            const result = guard(
                objHasLengthGreaterThanN,
                'TestObj'
            ).against.hasLengthLessThan(expectedLength);

            expect(result.isFail).toBe(true);
            expect(result.isSuccess).toBe(false);
            expect(result.error).not.toBeUndefined();
            expect(result.data).toBeUndefined();
        });

        it('Should return ok result when object has length greater than n', () => {
            const expectedLength = 5;
            const validObj = '12345';
            const result = guard(validObj, 'TestObj').against.hasLengthLessThan(
                expectedLength
            );

            expect(result.isFail).toBe(false);
            expect(result.isSuccess).toBe(true);
            expect(result.error).toBeUndefined();
            expect(result.data).not.toBeUndefined();
        });
    });
});
