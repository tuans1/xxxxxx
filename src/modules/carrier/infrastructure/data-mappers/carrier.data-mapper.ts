import { CarrierAggregate } from '@modules/carrier/domain/aggregates/carrier.aggregate';
import { CarrierCodeValueObject } from '@modules/carrier/domain/value-objects/carrier-code.value-object';
import { CarrierIdValueObject } from '@modules/carrier/domain/value-objects/carrier-id.value-object';
import { CarrierNameValueObject } from '@modules/carrier/domain/value-objects/carrier-name.value-object';
import { Error } from '@shared/_common/errors/error';
import { Result } from '@shared/_common/utils/result';
import { CarrierEntity as CarrierOrmEntity } from '@shared/vendors/typeorm/postgres/entities/CarrierEntity';

export class CarrierDataMapper {
    private constructor() {}

    public static transformPersistToDomain(
        carrierOrmEntity: CarrierOrmEntity
    ): Result<CarrierAggregate> {
        const createCarrierIdResult = CarrierIdValueObject.create({
            value: carrierOrmEntity.id
        });

        const createCarrierCodeResult = CarrierCodeValueObject.create({
            value: carrierOrmEntity.code
        });

        const createCarrierNameResult = CarrierNameValueObject.create({
            value: carrierOrmEntity.name
        });

        const errors = [
            createCarrierIdResult,
            createCarrierCodeResult,
            createCarrierNameResult
        ]
            .filter((r) => r.isFail)
            .map((r) => r.error);

        if (errors.length > 0) {
            return Result.fail(Error.serverError());
        }

        const createCarrierResult = CarrierAggregate.createFromPersistant(
            createCarrierIdResult.data,
            {
                code: createCarrierCodeResult.data,
                name: createCarrierNameResult.data
            }
        );

        if (createCarrierResult.isFail) {
            return Result.fail(Error.badRequest());
        }

        return Result.success(createCarrierResult.data);
    }

    public static transformDomainToPersist(
        carrier: CarrierAggregate
    ): Result<CarrierOrmEntity> {
        const carrierOrmEntity = new CarrierOrmEntity();

        carrierOrmEntity.id = carrier.id.value;
        carrierOrmEntity.code = carrier.code.value;
        carrierOrmEntity.name = carrier.name.value;

        return Result.success(carrierOrmEntity);
    }
}
