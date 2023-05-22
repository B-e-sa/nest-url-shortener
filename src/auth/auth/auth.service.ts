import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    signup(dto: any) {
        return { message: "signed up", dto }
    }

    signin() {
        return "signed in"
    }
}
