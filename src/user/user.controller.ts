import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guards';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private user: UserService) { }

    @UseGuards(JwtGuard)
    @Get('urls')
    getMe(@GetUser('id') userId: number) {
        return this.user.getUserUrls(userId)
    }

    @UseGuards(JwtGuard)
    @Get()
    async getUser(@GetUser() user: User) {
        return this.user.getUser(user)
    }

}
