import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "@prisma/client";

export const GetUser = createParamDecorator(
    (data: Express.Request, ctx: ExecutionContext) => {
        const req: Express.Request = ctx
            .switchToHttp()
            .getRequest();
        return req.user as User;
    })