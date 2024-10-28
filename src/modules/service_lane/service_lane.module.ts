import { ServiceLaneRepositorySymbol } from '@modules/service_lane/domain/repositories/service-lane/service-lane.repository';
import { Module, Provider } from '@nestjs/common';
import { UnitOfWorkServiceLaneSymbol } from '@shared/domain/uof-service-lane';
import { UnitOfWorkServiceLaneRepository } from '@shared/infrastructure/uof-service-lane';
import { CreateServiceLaneUseCase2 } from './application/use_cases/create-service-lane/create-service-lane-2.use-case';
import { CreateServiceLaneUseCase } from './application/use_cases/create-service-lane/create-service-lane.use-case';
import { GetListServiceLaneUseCase } from './application/use_cases/list-service-lane/get-service-lane.use-case';
import { ServiceLaneQueryableFactorySymbol } from './domain/repositories/service-lane/service-lane.queryable-factory';
import { ServiceLaneQueryableFactory } from './infrastructure/repositories/service-lane-db/service_lane.queryable-factory';
import { ServiceLaneRepository } from './infrastructure/repositories/service-lane-db/service_lane.repository';
import { HttpModule } from './presentation/http/http.module';

const useCases = [
    CreateServiceLaneUseCase,
    CreateServiceLaneUseCase2,
    GetListServiceLaneUseCase
];

// Use Memory
const _providerSet01: Provider[] = [
    ...useCases,
    {
        provide: UnitOfWorkServiceLaneSymbol,
        useFactory() {
            return new UnitOfWorkServiceLaneRepository();
        }
    },
    {
        provide: ServiceLaneRepositorySymbol,
        useFactory() {
            return new ServiceLaneRepository();
        }
    },
    {
        provide: ServiceLaneQueryableFactorySymbol,
        useFactory() {
            return new ServiceLaneQueryableFactory();
        }
    }
];

// Use Postgres DB
// const _providerSet02: Provider[] = [
//     ...useCases,
//     {
//         provide: UnitOfWorkSymbol,
//         useFactory() {
//             return new UnitOfWork2();
//         }
//     },
//     {
//         provide: CarrierRepositorySymbol,
//         useFactory() {
//             return new CarrierRepository2();
//         }
//     },
//     {
//         provide: ServiceLaneQueryableFactorySymbol,
//         useFactory() {
//             return new CarrierQueryableFactory2();
//         }
//     }
// ];

@Module({
    providers: _providerSet01,
    imports: [HttpModule]
})
export class ServiceLaneModule {}
