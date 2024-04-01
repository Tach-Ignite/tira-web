import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResendEmail {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string;
}
