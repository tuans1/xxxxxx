import { IsNotEmpty, IsString } from 'class-validator';

export class GetCarrierByIdRequest {
    @IsString()
    @IsNotEmpty()
    carrierId: string;
}
