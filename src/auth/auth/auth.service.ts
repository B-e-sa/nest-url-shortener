import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService) { }

    async signup(dto: AuthDto) {
        const { email, username, password } = dto;

        const hash = await argon.hash(password);

        try {
            await this.prismaService.user.create({
                data: {
                    email,
                    username,
                    password: hash
                }
            });

            return { message: "signed up" }
        } catch (e) {
            const { meta, code, message } = e;

            if (code === 'P2002') // duplicated row value conflict
                throw new ConflictException({
                    message: `${meta.target[0]} already taken`
                })

            throw new InternalServerErrorException({
                code,
                message
            })
        }
    }

    signin() {
        return "signed in"
    }
}
