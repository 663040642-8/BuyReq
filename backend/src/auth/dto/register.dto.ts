import { IsNotEmpty, IsString } from 'class-validator';
import { AuthBaseDto } from './auth-base.dto';

export class RegisterDto extends AuthBaseDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
}