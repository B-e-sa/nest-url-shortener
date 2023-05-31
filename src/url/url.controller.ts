import {
    Body,
    Controller,
    Post,
    Req,
    UseGuards,
    Get
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { UrlDto } from 'src/auth/auth/dto/url.dto';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {

    constructor(private url: UrlService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async createUrl(
        @Body() url: UrlDto,
        @Req() req: Request
    ) {
        const user = req.user as User
        const userId = user.id
        await this.url.createUrl(url, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAllUrls() {
        this.url.generateShortUrl();
        await this.url.getAllUrls();
    }
}
