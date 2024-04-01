import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { InquiryStatus } from '@prisma/client';

export class UpdateInquiryDto {
  @ApiProperty({ enum: InquiryStatus })
  @IsEnum(InquiryStatus)
  @IsNotEmpty()
  status: InquiryStatus;
}
