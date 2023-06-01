import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { UrlDto } from 'src/auth/dto/url.dto';
import { JwtGuard } from 'src/auth/guards';
import { UrlService } from './url.service';
import { GetUser } from 'src/auth/decorators/getUser.decorator';

@Controller('url')
export class UrlController {

    constructor(private url: UrlService) { }

    @UseGuards(JwtGuard)
    @Post('create')
    async createUrl(
        @Body() url: UrlDto,
        @GetUser() user: User
    ) {
        await this.url.createUrl(url, user.id);
    }

    @UseGuards(JwtGuard)
    @Get()
    async getAllUrls() {
        this.url.generateShortUrl();
        await this.url.getAllUrls();
    }
}
