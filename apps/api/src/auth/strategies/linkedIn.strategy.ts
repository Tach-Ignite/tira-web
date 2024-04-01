import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(private readonly config: ConfigService) {
    super({
      clientID: config.getOrThrow('LINKEDIN_CLIENT_ID'),
      clientSecret: config.getOrThrow('LINKEDIN_CLIENT_SECRET'),
      callbackURL: `${config.getOrThrow('API_URL')}/auth/linkedin/callback`,
      scope: ['openid', 'profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (_, __) => void,
  ) {
    const { id, givenName, familyName, email } = profile;
    const user = {
      id,
      firstName: givenName,
      lastName: familyName,
      email: email,
      provider: 'linkedin',
      accessToken,
    };

    done(null, user);
  }
}
