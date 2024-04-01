import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly config: ConfigService) {
    super({
      clientID: config.getOrThrow('GIT_OAUTH_CLIENT_ID'),
      clientSecret: config.getOrThrow('GIT_OAUTH_CLIENT_SECRET'),
      callbackURL: `${config.getOrThrow('API_URL')}/auth/github/callback`,
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (_, __) => void,
  ) {
    const { id, username, displayName, photos, emails } = profile;
    const user = {
      id,
      username,
      firstName: displayName,
      avatar: photos[0]?.value,
      email: emails[0]?.value,
      provider: 'github',
      accessToken,
    };

    done(null, user);
  }
}
