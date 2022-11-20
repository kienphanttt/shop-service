import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserAuth = createParamDecorator(
  (_: any, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user;

    return user || null;
  },
);
