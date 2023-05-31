import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { isEmail } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    async signup(dto: AuthDto) {
        const { email, username, password } = dto;

        try {
            const hash = await argon.hash(password);

            await this.prisma.user.create({
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
                message
            })
        }
    }

    async signin(dto: SigninDto) {
        const { usernameOrEmail, password } = dto;

        let user;

        try {

            if (isEmail(usernameOrEmail)) {
                user = await this.prisma
                    .findUserByEmail(usernameOrEmail)
            }

            user = await this.prisma
                .findUserByUsername(usernameOrEmail)

            if (!user) throw new BadRequestException({
                message: 'user not found'
            })

            const { id, username } = user;

            if (await argon.verify(user.password!, password)) {
                const token = this.jwt.sign({
                    sub: id,
                    username: username
                }, {
                    expiresIn: '7d',
                    privateKey: this.config.get('PRIVATE_KEY')
                })

                return { token }
            }

            throw new BadRequestException({
                message: 'incorrect password'
            })
        } catch (e) {
            throw new InternalServerErrorException({
                message: e.message
            })
        }

    }
}
