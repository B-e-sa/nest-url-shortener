import { Controller, Post, HttpCode, HttpStatus, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto)
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signin() {
        return this.authService.signin()
    }
}