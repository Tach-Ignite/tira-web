import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-azure-ad-oauth2';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, 'azure-ad') {
  constructor(
    private config: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    super({
      clientID: config.getOrThrow('AZURE_CLIENT_ID'),
      clientSecret: config.getOrThrow('AZURE_CLIENT_SECRET'),
      callbackURL: `${config.getOrThrow('API_URL')}/auth/microsoft/callback`,
      scope: ['openid', 'profile', 'email'],
      authorizationURL:
        'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (_, __) => void,
  ) {
    const profileData = await this.jwtService.decode(accessToken);
    const user = {
      id: profile.id,
      email: profileData.upn,
      provider: 'azure',
      firstName: profileData.given_name,
      lastName: profileData.family_name,
      accessToken,
    };
    done(null, user);
  }
}
