import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Inquiries, InquiryStatus } from '@prisma/client';

export class InquiryEntity implements Partial<Inquiries> {
  constructor(partial: Partial<Inquiries>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  inquiryId: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  reason: string;

  @ApiPropertyOptional()
  status?: InquiryStatus;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}
