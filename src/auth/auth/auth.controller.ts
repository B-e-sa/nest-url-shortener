import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private prismaService: PrismaService
    ) { }

    @Post('signup')
    async signup(@Body() dto: AuthDto) {
        const { email, username } = dto;

        const hash = await argon.hash(dto.password);

        const user = await this.prismaService.user.create({
            data: {
                email,
                username,
                password: hash
            }
        });

        return this.authService.signup(user)
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signin() {
        return this.authService.signin()
    }
}
