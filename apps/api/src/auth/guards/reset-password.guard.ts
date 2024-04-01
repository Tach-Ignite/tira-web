import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ResetPasswordGuard extends AuthGuard('jwt') {
  constructor(private config: ConfigService) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const isCognito = this.config.getOrThrow('AUTH_PROVIDER') === 'cognito';
    if (isCognito) return true;

    return super.canActivate(context) as boolean;
  }
}
