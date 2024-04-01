import {
  Controller,
  Post,
  Res,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
  Patch,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { Response } from 'express';
import { CurrentUser, GetCurrentUserId } from './current-user.decorator';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { AuthDto } from './dto/auth.dto';
import { Public } from '@common/decorators/public.decorators';
import { RoleAccess } from '@common/decorators/admin.decorator';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { Roles } from '../utils/roles.enums';
import { EmailVerifyGuard } from './guards/verify-email.guard';
import { ResendEmail } from './dto/resendEmail.dto';
import { ResetPasswordDTO } from './dto/resetPassword.dto';
import { ResetPasswordGuard } from './guards/reset-password.guard';
import { ChangePasswordDTO } from '@src/users/dto/change-password-dto';
import { GoogleOauthGuard } from './guards/google-auth.guard';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { MicrosoftAuthGuard } from './guards/microsoft-auth.guard';
import { LinkedInAuthGuard } from './guards/linkedin-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiTags('Auth')
  @Post('auth/login')
  @ApiCreatedResponse()
  async login(
    @Body() dto: AuthDto,
    @CurrentUser() user: Users,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(dto, response);
  }
  @Public()
  @ApiTags('Auth')
  @Post('auth/sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async signup(@Body() dto: SignUpDto) {
    return await this.authService.signUp(dto);
  }

  @Public()
  @ApiTags('Auth')
  @UseGuards(EmailVerifyGuard)
  @Post('auth/verify-email')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async verifyEmail(@GetCurrentUserId() userId) {
    return await this.authService.updateUser(userId, {
      emailVerifiedAt: new Date(),
    });
  }

  @Public()
  @ApiTags('Auth')
  @Post('auth/resend-email')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async resendEmail(@Body() dto: ResendEmail) {
    return await this.authService.resendEmail(dto.email);
  }

  @Public()
  @ApiTags('Auth')
  @Post('auth/reset-password')
  @UseGuards(ResetPasswordGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async resetPassword(@Body() dto: ResetPasswordDTO) {
    return await this.authService.resetPassword(
      dto.userId,
      dto.password,
      dto.token,
    );
  }

  @ApiTags('Users')
  @Post('user/change-password')
  @UseGuards(ResetPasswordGuard)
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse()
  async changePassword(
    @GetCurrentUserId() userId: string,
    @Body() dto: ChangePasswordDTO,
  ) {
    return await this.authService.changePassword({ ...dto, userId });
  }

  @Public()
  @ApiTags('Auth')
  @Post('auth/forgot-password')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async forgotPassword(@Body() dto: ResendEmail) {
    return await this.authService.forgotPassword(dto.email);
  }

  @ApiTags('Users')
  @ApiCookieAuth()
  @RoleAccess([Roles.ADMIN])
  @ApiResponse({ type: UserEntity })
  @ApiBody({ type: CreateUserDto })
  @Patch('users/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateDto: UpdateUserDto,
  ) {
    return await this.authService.updateUser(userId, updateDto);
  }

  @RoleAccess([Roles.ADMIN])
  @ApiTags('Users')
  @Delete('users/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse()
  async deleteUser(@Param('userId') userId: string) {
    return await this.authService.removeUser(userId);
  }

  @Public()
  @ApiTags('Auth')
  @Get('auth/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}

  @ApiTags('Auth')
  @Public()
  @Get('auth/google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleLoginCallback(@Req() req, @Res() res: Response) {
    return await this.authService.OAuthLogin(req, res);
  }

  @Public()
  @ApiTags('Auth')
  @Get('auth/github')
  @UseGuards(GithubAuthGuard)
  async githubAuth() {}

  @ApiTags('Auth')
  @Public()
  @Get('auth/github/callback')
  @UseGuards(GithubAuthGuard)
  async githubAuthCallback(@Req() req, @Res() res: Response) {
    return await this.authService.OAuthLogin(req, res);
  }

  @Public()
  @ApiTags('Auth')
  @Get('auth/microsoft')
  @UseGuards(MicrosoftAuthGuard)
  async microsoftAuth() {}

  @ApiTags('Auth')
  @Public()
  @Get('auth/microsoft/callback')
  @UseGuards(MicrosoftAuthGuard)
  async microsoftAuthCallback(@Req() req, @Res() res: Response) {
    return await this.authService.OAuthLogin(req, res);
  }

  @Public()
  @ApiTags('Auth')
  @Get('auth/linkedin')
  @UseGuards(LinkedInAuthGuard)
  async linkedinAuth() {}

  @ApiTags('Auth')
  @Public()
  @Get('auth/linkedin/callback')
  @UseGuards(LinkedInAuthGuard)
  async linkedinAuthCallback(@Req() req, @Res() res: Response) {
    return await this.authService.OAuthLogin(req, res);
  }
}
