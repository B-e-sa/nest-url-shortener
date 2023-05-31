import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { PrismaService } from "src/prisma/prisma.service"
import { AuthService } from "../auth.service"
import { User } from "@prisma/client"

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt'
) {
    constructor(
        config: ConfigService,
        private prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('PRIVATE_KEY')
        })
    }

    async validate(payload: { sub: number, username: string }) {
        const user = await this.prisma
            .findUserByUsername(payload.username)

        delete user!.password;

        return user;
    }
}