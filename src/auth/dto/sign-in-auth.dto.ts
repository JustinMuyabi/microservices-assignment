import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class SignInAuthDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
