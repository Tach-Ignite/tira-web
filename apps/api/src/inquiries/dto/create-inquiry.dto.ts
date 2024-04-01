import { ApiProperty } from '@nestjs/swagger';
import { Inquiries } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInquiryDto implements Partial<Inquiries> {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  reason: string;
}
