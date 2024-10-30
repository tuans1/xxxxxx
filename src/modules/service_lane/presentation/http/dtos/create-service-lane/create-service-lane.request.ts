import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateServiceLaneRequest {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(10)
    code: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
