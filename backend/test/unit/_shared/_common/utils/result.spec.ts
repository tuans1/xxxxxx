import { Result } from '@shared/_common/utils/result';

describe(__dirname, () => {
    it('Create ok result', () => {
        const result = Result.success('Data');
        expect(result.isSuccess).toBe(true);
        expect(result.isFail).toBe(false);
        expect(result.error).toBeUndefined();
        expect(result.data).toBe('Data');
        expect(result.present()).toEqual({
            isSuccess: true,
            error: undefined,
            data: 'Data'
        });
    });

    it('Create fail result', () => {
        const result = Result.fail('Error');
        expect(result.isSuccess).toBe(false);
        expect(result.isFail).toBe(true);
        expect(result.data).toBeUndefined();
        expect(result.error).toBe('Error');
    });
});
