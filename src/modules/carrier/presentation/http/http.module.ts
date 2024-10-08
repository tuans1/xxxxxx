import { CreateCarrierUseCase } from '@modules/carrier/application/use-cases/create-carrier/create-carrier.use-case';
import { CarrierRepositorySymbol } from '@modules/carrier/domain/repositories/carrier.repository';
import { CarrierRepository } from '@modules/carrier/infrastructure/repositories/carrier.repository';
import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CarrierController } from './controllers/carrier.controller';

const useCases = [CreateCarrierUseCase];

const providers: Provider[] = [
    ...useCases,
    {
        provide: CarrierRepositorySymbol,
        useClass: CarrierRepository
    }
];
@Module({
    providers,
    imports: [CqrsModule],
    controllers: [CarrierController]
})
export class HttpModule {}
