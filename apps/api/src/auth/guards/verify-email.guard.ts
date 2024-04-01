import { AuthGuard } from '@nestjs/passport';

export class EmailVerifyGuard extends AuthGuard('verifyEmail') {
  constructor() {
    super();
  }
}
