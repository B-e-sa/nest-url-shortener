import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
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
        const user = await new PrismaClient().user.findUnique({
            where: { email }
        })

        return user;
    }
}
