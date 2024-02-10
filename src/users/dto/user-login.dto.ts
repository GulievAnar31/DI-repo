import { IsEmail, IsString } from "class-validator";

export class UserLoginDto {
    @IsEmail({}, { message: 'Неверно указан Email' })
    email: string;
    @IsString({ message: 'Неуказан пароль' })
    password: string;
}