import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GenderIdentity } from '@prisma/client';
import { UserRole } from '@src/user-role/entities/user-role.entity';

class UpdateProfileEntity {
  @ApiProperty({ required: false })
  fullName?: string;

  @ApiProperty({ required: false })
  id?: string;

  @ApiProperty({ required: false })
  phoneNumber?: string;

  @ApiProperty({ required: false })
  city?: string;

  @ApiProperty({ required: false })
  state?: string;

  @ApiProperty({ required: false })
  genderIdentity: GenderIdentity;

  @ApiProperty({ required: false })
  race: string[];

  @ApiProperty({ required: false })
  militaryVeteran?: string;

  @ApiProperty({
    required: false,
  })
  linkedInURL?: string;

  @ApiProperty({ required: false })
  websiteURL?: string;

  @ApiProperty({ required: false })
  githubURL?: string;

  @ApiProperty({ required: false })
  mediumURL?: string;

  @ApiProperty({
    required: false,
  })
  stackOverflowURL?: string;

  @ApiProperty({ required: false })
  calendarLink?: string;

  constructor(partial: Partial<UpdateProfileEntity>) {
    Object.assign(this, partial);
  }
}

export class AllUserDetailsEntity {
  @ApiProperty()
  userId: string;

  @ApiPropertyOptional({ type: UserRole })
  role?: UserRole;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  userProfile: UpdateProfileEntity;
}
