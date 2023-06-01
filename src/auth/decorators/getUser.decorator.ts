import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "@prisma/client";

export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const req: Express.Request = ctx
            .switchToHttp()
            .getRequest();

        // @ts-expect-error 
        // some error is happening when trying to get the value of a object key
        // by string index, even though is possible
        if (data) return req.user[data]

        return req.user as User;
    })