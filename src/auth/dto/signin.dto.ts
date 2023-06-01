import { IsNotEmpty } from "class-validator"

export class SigninDto {
    @IsNotEmpty()
    usernameOrEmail: string

    @IsNotEmpty()
    password: string 
}