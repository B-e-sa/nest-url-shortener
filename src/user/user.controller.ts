import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/auth/guards';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/auth/decorators/getUser.decorator';

@Controller('user')
export class UserController {
    constructor(private user: UserService) { }

    @UseGuards(JwtGuard)
    @Get('urls')
    getMe(@GetUser() user: User) {
        return this.user.getUserUrls(user)
    }

    @UseGuards(JwtGuard)
    @Get()
    async getUser(@GetUser() user: User) {
        return this.user.getUser(user)
    }

}
