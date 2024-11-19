import { ServiceLaneRepository } from '@modules/service_lane/domain/repositories/service-lane/service-lane.repository';
import { Result } from '@shared/_common/utils/result';

export abstract class UnitOfWorkServiceLane {
    protected _serviceLaneRepository: ServiceLaneRepository;

    public abstract get serviceLaneRepository(): ServiceLaneRepository;

    public abstract startTransaction(): Promise<Result>;
    public abstract commitTransaction(): Promise<Result>;
    public abstract rollbackTransaction(): Promise<Result>;
}

export const UnitOfWorkServiceLaneSymbol = Symbol('UnitOfWorkServiceLane');
