import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateInviteDto } from './create-invite.dto';

export class UpdateInviteDto extends PartialType(CreateInviteDto) {
  @IsOptional()
  @ApiProperty()
  @IsString()
  inviteCode: string;
}
