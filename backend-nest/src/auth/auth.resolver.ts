import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from './current-user.decorator';
import { AuthService } from './auth.service';
import { AuthPayload, AuthUser, LoginInput } from './auth.types';
import { GqlAuthGuard } from './gql-auth.guard';

const REFRESH_COOKIE = 'katel_refresh';
const REFRESH_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000;

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => AuthPayload)
  async login(@Args('input') input: LoginInput, @Context() context: any) {
    const result = await this.auth.login(input.email, input.password, this.metadata(context));
    this.setRefreshCookie(context.res, result.refreshToken);
    return result;
  }

  @Mutation(() => AuthPayload)
  async refreshSession(@Context() context: any) {
    const result = await this.auth.refresh(
      context.req.cookies?.[REFRESH_COOKIE],
      this.metadata(context),
    );
    this.setRefreshCookie(context.res, result.refreshToken);
    return result;
  }

  @Mutation(() => Boolean)
  async logout(@Context() context: any) {
    await this.auth.logout(context.req.cookies?.[REFRESH_COOKIE]);
    context.res.clearCookie(REFRESH_COOKIE, this.cookieSecurityOptions());
    return true;
  }

  @Query(() => AuthUser)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: AuthUser) {
    return user;
  }

  private metadata(context: any) {
    return {
      ip: context.req.ip,
      userAgent: context.req.headers['user-agent'],
    };
  }

  private setRefreshCookie(response: any, token: string) {
    response.cookie(REFRESH_COOKIE, token, {
      ...this.cookieSecurityOptions(),
      maxAge: REFRESH_LIFETIME_MS,
    });
  }

  private cookieSecurityOptions() {
    const production = process.env.NODE_ENV === 'production';
    return {
      httpOnly: true,
      secure: production,
      sameSite: production ? 'none' as const : 'lax' as const,
      path: '/graphql',
    };
  }
}
