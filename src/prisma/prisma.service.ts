import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: "file:./dev.db"
                },
            },
        });
    }

    private prisma = new PrismaClient();

    async findUserByUsername(username: string) {
        const user = await this.prisma.user.findUnique({
            where: { username }
        })

        return user;
    }

    async findUserByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email }
        })

        return user;
    }
}
