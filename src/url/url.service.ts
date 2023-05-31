import { Injectable } from '@nestjs/common';
import { UrlDto } from 'src/auth/auth/dto/url.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UrlService {

    constructor(private prisma: PrismaService) { }

    generateShortUrl() {
        const chars =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

        let shorterUrl: string = "";

        for (let i = 0; i < 6; i++) {
            const randomNumber = Math.round(Math.random() * 49)
            shorterUrl + chars[randomNumber]
        }

        return shorterUrl;
    }

    async createUrl(url: UrlDto, userId: number) {
        try {
            await this.prisma.url.create({
                data: {
                    original_url: url.originalUrl,
                    short_url: this.generateShortUrl(),
                    user_id: userId
                }
            })
        } catch (e) {
            throw new InternalServerErrorException({
                message: e.message
            })
        }
    }

    async getAllUrls() {
        return await this.prisma.url.findMany();
    }

}
