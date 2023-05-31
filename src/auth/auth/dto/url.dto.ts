import { IsNotEmpty } from "class-validator"

export class UrlDto {

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    originalUrl: string

}