import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }

    async getUserUrls(user: any) {
        if (!user.urls)
            throw new NotFoundException({
                message: "The user doesn't have any created urls"
            })
        return user.urls
    }

    async getUser(username: string) {
        const user =
            await this.prisma.findUserByUsername(username)

        delete user!.password

        return user
    }

}
