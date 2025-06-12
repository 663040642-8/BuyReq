import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateShopDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsString()
    @IsNotEmpty()
    phone: string;
}
