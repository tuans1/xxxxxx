import { isPresentable } from '../interfaces/presentable/presentable.helper';

export class PresentablePresenter {
    static presentAllPresentableFromObj(obj: any) {
        const wrapper = { data: obj };

        const workingItems = [{ obj: wrapper, prop: 'data' }];

        do {
            const curItem = workingItems.shift();

            const { obj: curObj, prop: curProp } = curItem;

            let target = curObj[curProp];

            if (isPresentable(target)) {
                curObj[curProp] = target.present();
            }

            target = curObj[curProp];

            if (typeof target === 'object' || Array.isArray(target)) {
                for (const prop of Object.keys(target)) {
                    workingItems.push({ obj: target, prop });
                }
            }
        } while (workingItems.length > 0);

        return wrapper.data;
    }
}
