import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private user: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('urls')
    getMe(@Req() req: Request) {
        return this.user.getUserUrls(req.user)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUser(@Req() req: Request) {
        const user = req.user as User
        const username = user.username
        return this.user.getUser(username)
    }


}
