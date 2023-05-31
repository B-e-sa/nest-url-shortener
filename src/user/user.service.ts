import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {

    async getUserUrls(user: any) {
        if (!user.urls)
            throw new NotFoundException({
                message: "The user doesn't have any created urls"
            })
        return user.urls
    }

}
