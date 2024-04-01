// import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { AuthDto } from './auth.dto';
// import { ApiPropertyOptional } from '@nestjs/swagger';

export class SignUpDto extends AuthDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty()
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
