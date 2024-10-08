import { CreateCarrierUseCase2 } from '@modules/carrier/application/use-cases/create-carrier/create-carrier-2.use-case';
import { CreateCarrierUseCase } from '@modules/carrier/application/use-cases/create-carrier/create-carrier.use-case';
import { CarrierRepositorySymbol } from '@modules/carrier/domain/repositories/carrier.repository';
import { CarrierRepository } from '@modules/carrier/infrastructure/repositories/carrier-2.repository';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UnitOfWorkSymbol } from '@shared/domain/unit-of-work';
import { UnitOfWork } from '@shared/infrastructure/unit-of-work';
import { CarrierController } from './controllers/carrier.controller';

const useCases = [CreateCarrierUseCase, CreateCarrierUseCase2];

const providers: Provider[] = [
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
    }
];
@Module({
    providers,
    imports: [CqrsModule],
    controllers: [CarrierController]
})
export class HttpModule {}
