import { Result } from '@shared/_common/utils/result';

export interface Queryable<TReturn> {
    execute(): Promise<Result<TReturn>>;
}
