import { ServiceLaneRepositorySymbol } from '@modules/service_lane/domain/repositories/service-lane/service-lane.repository';
import { Module, Provider } from '@nestjs/common';
import { UnitOfWorkSymbol } from '@shared/domain/unit-of-work';
import { UnitOfWork } from '@shared/infrastructure/unit-of-work';
import { CreateServiceLaneUseCase } from './application/use_cases/create-service-lane/create-service-lane.use-case';
import { ServiceLaneQueryableFactorySymbol } from './domain/repositories/service-lane/service-lane.queryable-factory';
import { ServiceLaneQueryableFactory } from './infrastructure/repositories/service-lane/service-lane.queryable-factory';
import { ServiceLaneRepository } from './infrastructure/repositories/service-lane-db/service_lane.repository';
import { HttpModule } from './presentation/http/http.module';

const useCases = [
    CreateServiceLaneUseCase
    // CreateCarrierUseCase2,
    // GetCarrierByIdUseCase
];

// Use Memory
const _providerSet01: Provider[] = [
    ...useCases,
    {
        provide: UnitOfWorkSymbol,
        useFactory() {
            return new UnitOfWork();
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
