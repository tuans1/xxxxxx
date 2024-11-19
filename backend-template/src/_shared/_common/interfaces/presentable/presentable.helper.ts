import { Presentable } from './presentable';

export function isPresentable(obj: any): obj is Presentable {
    return (
        typeof obj === 'object' &&
        'present' in obj &&
        typeof obj['present'] === 'function'
    );
}
