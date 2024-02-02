import { IsEmail, IsString } from "class-validator";

export class UserRegisterDto {
    @IsEmail({}, { message: 'Неверно указан Email' })
    email: string;

    @IsString({ message: 'Неуказан пароль' })
    password: string;

    @IsString({ message: 'Неуказано имя' })
    name: string;
}