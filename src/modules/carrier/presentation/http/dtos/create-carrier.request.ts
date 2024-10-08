import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCarrierRequest {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(10)
    carrierCode: string;

    @IsString()
    @IsNotEmpty()
    carrierName: string;
}
