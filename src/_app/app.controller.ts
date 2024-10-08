import { Controller, Get } from '@nestjs/common';
import { GetLocationsByCodesResponse } from '@ocean-network-express/om-mdm-protobuf/index.chorus.mdm.location.v1';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/health')
    getHealth(): string {
        return this.appService.getHealth();
    }

    @Get('/location')
    async getLocation(): Promise<Observable<GetLocationsByCodesResponse>> {
        return this.appService.getLocation();
    }
}
