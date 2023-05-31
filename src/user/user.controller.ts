import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private user: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('urls')
    getMe(@Req() req: Request) {
        return this.user.getUserUrls(req.user)
    }

}
