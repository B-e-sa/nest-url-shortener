import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto)
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto: SigninDto) {
        return this.authService.signin(dto)
    }
}
