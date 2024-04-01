import { ApiProperty } from '@nestjs/swagger';
import { Users } from '@prisma/client';

export class UserEntity implements Partial<Users> {
  constructor(partial: Partial<Users>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;
}
