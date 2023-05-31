import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { PrismaClient, Url, User } from '@prisma/client';

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

    async findUserByUsername(username: string): Promise<User | null> {
        const user: User | null = await this.prisma.user.findUnique({
            where: { username }
        })

        return user;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const user: User | null = await new PrismaClient().user.findUnique({
            where: { email }
        })

        return user;
    }

    async getUserUrlsById(userId: number): Promise<Url[] | null> {
        const urls: Url[] | null = await this.prisma.url.findMany({
            where: { user_id: userId }
        })

        if (!urls) {
            throw new NotFoundException({
                message: "user doesn't have any urls"
            })
        }

        return urls
    }
}
