import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CognitoStrategy extends PassportStrategy(Strategy, 'cognito') {
  constructor(
    private config: ConfigService,
    private user: UsersService,
  ) {
    const uri = `https://cognito-idp.${config.getOrThrow('AWS_REGION')}.amazonaws.com/${config.getOrThrow('AWS_COGNITO_USER_POOL_ID')}`;
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: uri + '/.well-known/jwks.json',
      }),

      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) =>
          request.cookies.Authentication ||
          request.headers?.authorization?.split?.('Bearer ')?.[1],
      ]),
      audience: config.getOrThrow('AWS_COGNITO_CLIENT_ID'),
      issuer: uri,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    await this.user.getUser({
      email: payload.email,
      sub: payload.sub,
    });
    return payload;
  }
}
