import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { UserRole } from '../../user-role/entities/user-role.entity';
import { AddressEntity } from '@src/addresses/entities/address.entity';

export class UserEntity implements Partial<Users> {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  userId: string;

  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  userType: string;

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

  @ApiPropertyOptional({ type: UserRole })
  role?: UserRole;

  @ApiProperty()
  roleId: string;

  @Exclude()
  hash?: string; //password hash

  @Exclude()
  sub?: string; // Sub Id of third party providers

  @ApiPropertyOptional({ type: [AddressEntity] })
  addresses?: AddressEntity[];
}