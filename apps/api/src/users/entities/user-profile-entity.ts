import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Users } from '@prisma/client';

export class UserProfileEntity implements Partial<Users> {
  constructor(partial: Partial<UserProfileEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  userId: string;

  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;

  @ApiPropertyOptional()
  emailVerifiedAt?: Date;

  @ApiPropertyOptional()
  phoneNumber?: string;

  @ApiPropertyOptional()
  profileImage?: string;
}
