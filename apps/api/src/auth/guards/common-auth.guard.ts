import {
  ExecutionContext,
  Inject,
  Injectable,
  forwardRef,
  CanActivate,
  Optional,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CognitoAuthGuard } from './cognito-auth.guard';

@Injectable()
export class CommonAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => JwtAuthGuard)) private jwtAuthGuard: JwtAuthGuard,
    @Optional()
    @Inject(forwardRef(() => CognitoAuthGuard))
    private cognitoAuthGuard: CognitoAuthGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    let isCognitoValid = false;

    try {
      isCognitoValid = (await this.cognitoAuthGuard?.canActivate(
        context,
      )) as boolean;
    } catch (e) {
      isCognitoValid = false;
    }

    let isJWTValid = false;
    try {
      isJWTValid = await this.jwtAuthGuard.canActivate(context);
    } catch (e) {
      isJWTValid = false;
    }
    if (!isCognitoValid && !isJWTValid) {
      throw new HttpException(
        {
          data: null,
          message: 'Unauthorized',
          status: HttpStatus.UNAUTHORIZED,
          error: 'FORBIDDEN',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return isCognitoValid || isJWTValid;
  }
}
