import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty()
  @IsString()
  serviceId: string;

  @ApiProperty()
  @IsDateString()
  bookingDate: Date;

  @ApiProperty()
  @IsDateString()
  startTime: Date;

  @ApiProperty()
  @IsDateString()
  endTime: Date;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  zipCode?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contactFirstName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contactLastName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contactEmail?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contactPhone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contactAddress?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contactCity?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contactState?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contactZipCode?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  bookingNotes?: string;
}
