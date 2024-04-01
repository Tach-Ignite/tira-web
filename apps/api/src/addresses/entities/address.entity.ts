import { ApiProperty } from '@nestjs/swagger';

export class AddressEntity {
  constructor(partial: Partial<AddressEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  addressId?: string;

  @ApiProperty()
  userId?: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  apartment?: string;

  @ApiProperty()
  state?: string;

  @ApiProperty()
  city?: string;

  @ApiProperty()
  zipCode?: string;

  @ApiProperty()
  primary?: boolean;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
