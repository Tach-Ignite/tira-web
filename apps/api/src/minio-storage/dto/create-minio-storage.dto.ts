import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBucketDto {
  @ApiProperty()
  @IsNotEmpty()
  bucketName: string;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  file: Express.Multer.File;
}

export class MultiFileUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @IsNotEmpty()
  files: Express.Multer.File[];
}
