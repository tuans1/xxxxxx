import { ValueObject } from '@base/base.value-object';
import { Error } from '@shared/_common/errors/error';
import { guard } from '@shared/_common/utils/guard';
import { Result } from '@shared/_common/utils/result';

type Props = {
    value: string;
};

const NAME = 'ServiceLaneId';

export class ServiceLaneIdValueObject extends ValueObject<Props> {
    public get value() {
        return this._props.value;
    }

    public present() {
        return this.value;
    }

    public static create(props: Props): Result<ServiceLaneIdValueObject> {
        const guardValue = guard(props.value, NAME);

        const guardValueResults = [
            guardValue.against.beingNull(),
            guardValue.against.beingEmpty()
        ];

        const guardValueFailResults = guardValueResults.filter(
            (rs) => rs.isFail
        );

        if (guardValueFailResults.length) {
            return Result.fail(
                Error.simple(
                    `Failed to create ${NAME}`,
                    guardValueFailResults.map((r) => r.error)
                )
            );
        }

        return Result.success(
            new ServiceLaneIdValueObject({
                value: guardValueResults[0].data
            })
        );
    }
}
