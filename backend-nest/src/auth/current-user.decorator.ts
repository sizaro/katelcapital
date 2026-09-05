import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
export const CurrentUser = createParamDecorator((_d: unknown, c: ExecutionContext) => GqlExecutionContext.create(c).getContext().req.user);
