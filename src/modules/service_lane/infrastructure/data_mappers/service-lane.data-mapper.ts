import { CarrierCodeValueObject } from '@modules/carrier/domain/value-objects/carrier-code.value-object';
import { CarrierIdValueObject } from '@modules/carrier/domain/value-objects/carrier-id.value-object';
import { CarrierNameValueObject } from '@modules/carrier/domain/value-objects/carrier-name.value-object';
import { ServiceLaneAggregate } from '@modules/service_lane/domain/aggregates/service-lane.aggregate';
import { Error } from '@shared/_common/errors/error';
import { Result } from '@shared/_common/utils/result';
import { ServiceLaneEntity } from '@shared/vendors/typeorm/postgres/entities/ServiceLaneEntity';

export class ServiceLaneDataMapper {
    private constructor() {}

    public static transformPersistToDomain(
        carrierOrmEntity: ServiceLaneEntity
    ): Result<ServiceLaneAggregate> {
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

        const createCarrierResult = ServiceLaneAggregate.createFromPersistant(
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

    public static transformPersistListToDomain(
        serviceLaneEntities: ServiceLaneEntity[]
    ): Result<ServiceLaneAggregate[]> {
        const listServiceLane: ServiceLaneAggregate[] = [];

        for (const entity of serviceLaneEntities) {
            const result = this.transformPersistToDomain(entity);
            if (result.isFail) {
                return Result.fail(result.error);
            }
            listServiceLane.push(result.data);
        }

        return Result.success(listServiceLane);
    }

    public static transformDomainToPersist(
        carrier: ServiceLaneAggregate
    ): Result<ServiceLaneEntity> {
        const carrierOrmEntity = new ServiceLaneEntity();

        carrierOrmEntity.id = carrier.id.value;
        carrierOrmEntity.code = carrier.code.value;
        carrierOrmEntity.name = carrier.name.value;

        return Result.success(carrierOrmEntity);
    }
}
