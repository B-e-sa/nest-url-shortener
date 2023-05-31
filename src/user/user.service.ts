import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }

    async getUserUrls(user: User) {
        return await this.prisma.getUserUrlsById(user.id)
    }

    async getUser(user: User) {
        const urls =
            await this.prisma.url.findMany({
                where: { user_id: user.id }
            })

        delete user!.password

        return { ...user, urls }
    }

}
