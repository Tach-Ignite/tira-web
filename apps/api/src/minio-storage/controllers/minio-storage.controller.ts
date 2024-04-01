import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  CreateBucketDto,
  FileUploadDto,
  MultiFileUploadDto,
} from '../dto/create-minio-storage.dto';
import { MinioStorageService } from '../services/minio-storage.service';
import { Express } from 'express';
import { Public } from '@common/decorators/public.decorators';

@ApiTags('Assets')
@Controller({
  path: 'assets',
  version: '1',
})
export class MinioStorageController {
  constructor(private minioService: MinioStorageService) {}
  @Get('buckets')
  async listBuckets() {
    return this.minioService.listBuckets();
  }

  @Post('make-bucket')
  async createBucket(@Body() createBucketDto: CreateBucketDto) {
    try {
      return this.minioService.createBucket(createBucketDto.bucketName);
    } catch (error) {
      throw new HttpException(
        {
          error: error.response,
          message: error.response.message,
          status: error.response.status,
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File Upload',
    type: FileUploadDto,
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException(
        {
          error: 'INVALID',
          status: HttpStatus.BAD_REQUEST,
          message: 'file missing',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const objectName = file.originalname;
    const metadata = {
      'Content-Type': file.mimetype,
    };
    const response = this.minioService.addObject<string>(
      objectName,
      file.buffer,
      metadata,
    );
    return response;
  }

  @Post('multi-upload')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File Upload',
    type: MultiFileUploadDto,
  })
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new HttpException(
        {
          error: 'INVALID',
          status: HttpStatus.BAD_REQUEST,
          message: 'Files missing',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const fileObjects = [];

    for (const file of files) {
      fileObjects.push({
        objectName: file.originalname,
        fileBuffer: file.buffer,
        metadata: {
          'Content-Type': file.mimetype,
        },
      });
    }

    const response = await this.minioService.addObjects<string[]>(fileObjects);

    return response;
  }

  @Delete('/:objectName')
  async removeObject(@Param('objectName') objectName: string) {
    try {
      const response = this.minioService.removeObject(objectName);
      return response;
    } catch (error) {
      throw new HttpException(
        {
          error: error.response,
          message: error.response.message,
          status: error.response.status,
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
