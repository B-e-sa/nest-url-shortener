import { IsEmail, IsNotEmpty, Length } from "class-validator"

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @Length(5, 25)
    username: string

    @IsNotEmpty()
    @Length(8, 30)
    password: string
}