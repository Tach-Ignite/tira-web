import { ApiProperty } from '@nestjs/swagger';
import { Users, UserProfiles } from '@prisma/client';

export class UserProfileEntity implements Partial<UserProfiles> {
  constructor(partial: Partial<UserProfiles>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

export class UserEntity implements Partial<Users> {
  constructor(partial: Partial<Users>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  email: string;

  @ApiProperty()
  userProfile: UserProfileEntity;
}
