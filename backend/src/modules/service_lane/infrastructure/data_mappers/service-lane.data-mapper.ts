import { ServiceLaneAggregate } from '@modules/service_lane/domain/aggregates/service-lane.aggregate';
import { ServiceLaneCodeValueObject } from '@modules/service_lane/domain/value-objects/service-lane-code.value-object';
import { ServiceLaneIdValueObject } from '@modules/service_lane/domain/value-objects/service-lane-id.value-object';
import { ServiceLaneNameValueObject } from '@modules/service_lane/domain/value-objects/service-lane-name.value-object';
import { Error } from '@shared/_common/errors/error';
import { Result } from '@shared/_common/utils/result';
import { ServiceLaneEntity } from '@shared/vendors/typeorm/postgres/entities/ServiceLaneEntity';

export class ServiceLaneDataMapper {
    private constructor() {}

    public static transformPersistToDomain(
        serviceLaneOrmEntity: ServiceLaneEntity
    ): Result<ServiceLaneAggregate> {
        const serviceLaneIdResult = ServiceLaneIdValueObject.create({
            value: serviceLaneOrmEntity.id
        });

        const serviceLaneCodeResult = ServiceLaneCodeValueObject.create({
            value: serviceLaneOrmEntity.code
        });

        const serviceLaneNameResult = ServiceLaneNameValueObject.create({
            value: serviceLaneOrmEntity.name
        });

        const errors = [
            serviceLaneIdResult,
            serviceLaneCodeResult,
            serviceLaneNameResult
        ]
            .filter((r) => r.isFail)
            .map((r) => r.error);

        if (errors.length > 0) {
            return Result.fail(Error.serverError());
        }

        const serviceLaneResult = ServiceLaneAggregate.createFromPersistant(
            serviceLaneIdResult.data,
            {
                code: serviceLaneCodeResult.data,
                name: serviceLaneNameResult.data,
                effectiveDate: serviceLaneOrmEntity.effectiveDate,
                sapCrtCode: serviceLaneOrmEntity.sapCrtCode,
                status: serviceLaneOrmEntity.status,
                feederTrunk: serviceLaneOrmEntity.feederTrunk
            }
        );

        if (serviceLaneResult.isFail) {
            return Result.fail(Error.badRequest());
        }

        return Result.success(serviceLaneResult.data);
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

    // public static transformDomainToPersist(
    //     carrier: ServiceLaneAggregate
    // ): Result<ServiceLaneEntity> {
    //     const serviceLaneOrmEntity = new ServiceLaneEntity();

    //     serviceLaneOrmEntity.id = carrier.id.value;
    //     serviceLaneOrmEntity.code = carrier.code.value;
    //     serviceLaneOrmEntity.name = carrier.name.value;

    //     return Result.success(serviceLaneOrmEntity);
    // }
}
