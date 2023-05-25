import { BadRequestException, Body, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { SigninDto } from './dto/signin.dto';
import { isEmail } from 'class-validator';

@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService) { }

    async signup(dto: AuthDto) {
        const { email, username, password } = dto;

        try {
            const hash = await argon.hash(password);

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
                message
            })
        }
    }

    async signin(dto: SigninDto) {
        const { usernameOrEmail, password } = dto;

        let user;

        try {

            if (isEmail(usernameOrEmail)) {
                user = await this.prismaService
                    .findUserByEmail(usernameOrEmail)
            }

            user = await this.prismaService
                .findUserByUsername(usernameOrEmail)

            if (!user) throw new BadRequestException({
                message: 'user not found'
            })

            if (await argon.verify(user.password, password))
                return {
                    message: 'logged in',
                    token: ''
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
