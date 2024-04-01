import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserRole implements Partial<UserRole> {
  constructor(partial: Partial<UserRole>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}
