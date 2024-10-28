import { CreateCarrierUseCase } from '@modules/carrier/application/use-cases/create-carrier/create-carrier.use-case';
import { GetCarrierByIdUseCase } from '@modules/carrier/application/use-cases/get-carrier-by-id/get-carrier-by-id.use-case';
import { CarrierQueryableFactorySymbol } from '@modules/carrier/domain/repositories/carrier/carrier.queryable-factory';
import { CarrierRepositorySymbol } from '@modules/carrier/domain/repositories/carrier/carrier.repository';
import { CarrierQueryableFactory as CarrierQueryableFactory2 } from '@modules/carrier/infrastructure/repositories/carrier-2/carrier.queryable-factory';
import { CarrierRepository as CarrierRepository2 } from '@modules/carrier/infrastructure/repositories/carrier-2/carrier.repository';
import { CarrierQueryableFactory } from '@modules/carrier/infrastructure/repositories/carrier/carrier.queryable-factory';
import { CarrierRepository } from '@modules/carrier/infrastructure/repositories/carrier/carrier.repository';
import { Module, Provider } from '@nestjs/common';
import { UnitOfWorkSymbol } from '@shared/domain/unit-of-work';
import { UnitOfWork } from '@shared/infrastructure/unit-of-work';
import { UnitOfWork as UnitOfWork2 } from '@shared/infrastructure/unit-of-work-2';
import { HttpModule } from './presentation/http/http.module';

const useCases = [
    CreateCarrierUseCase,
    // CreateCarrierUseCase2,
    GetCarrierByIdUseCase
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
        provide: CarrierRepositorySymbol,
        useFactory() {
            return new CarrierRepository();
        }
    },
    {
        provide: CarrierQueryableFactorySymbol,
        useFactory() {
            return new CarrierQueryableFactory();
        }
    }
];

// Use Postgres DB
const _providerSet02: Provider[] = [
    ...useCases,
    {
        provide: UnitOfWorkSymbol,
        useFactory() {
            return new UnitOfWork2();
        }
    },
    {
        provide: CarrierRepositorySymbol,
        useFactory() {
            return new CarrierRepository2();
        }
    },
    {
        provide: CarrierQueryableFactorySymbol,
        useFactory() {
            return new CarrierQueryableFactory2();
        }
    }
];

@Module({
    providers: _providerSet02,
    imports: [HttpModule]
})
export class CarrierModule {}
