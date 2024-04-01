import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { AbstractApiResponse } from '../../utils/general-response';
import { LoggerService } from '@common/logger/logger.service';
import { v4 as uuid } from 'uuid';

function sanitizeFileName(fileName: string) {
  // Remove file extension
  const indexOfDot = fileName.lastIndexOf('.');
  const sanitizedFileName = fileName.substring(0, indexOfDot);

  // Replace spaces with underscores
  const underscoredFileName = sanitizedFileName.replace(/[^a-zA-Z0-9]/g, '_');

  return underscoredFileName;
}

const MimeTypeMap = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'application/pdf': 'pdf',
  'text/plain': 'txt',
  'text/html': 'html',
  'application/json': 'json',
  'application/javascript': 'js',
  'application/xml': 'xml',
  'application/zip': 'zip',
};

@Injectable()
export class MinioStorageService implements OnModuleInit {
  constructor(
    @Inject(MINIO_CONNECTION) private readonly minioClient,
    private readonly config: ConfigService,
    private readonly loggerService: LoggerService,
  ) {}

  async onModuleInit(): Promise<void> {
    const bucketName = await this.config.getOrThrow('BUCKET_NAME');
    this.loggerService.log('bucket', bucketName);

    const bucketExists = await this.minioClient.bucketExists(bucketName);

    if (!bucketExists) {
      await this.createBucket(bucketName);
    }

    await this.setBucketPolicy(bucketName);
  }

  async createBucket(bucketName: string) {
    await this.minioClient.makeBucket(bucketName);
  }

  async listBuckets() {
    const buckets = await this.minioClient.listBuckets();
    return buckets;
  }

  async bucketExists(bucketName: string) {
    const bucketExists = await this.minioClient.bucketExists(bucketName);
    return bucketExists;
  }

  async addObject<T>(
    objectName: string,
    fileBuffer: Buffer,
    metadata: object,
  ): Promise<AbstractApiResponse<T>> {
    const id = uuid();
    const contentType = metadata['Content-Type'];
    const extension = MimeTypeMap[contentType];
    const sanitizedFileName = sanitizeFileName(objectName);
    const generatedUrl = `${sanitizedFileName}--${id}.${extension}`;
    const bucketName = await this.config.getOrThrow('BUCKET_NAME');
    const bucketExists = await this.minioClient.bucketExists(bucketName);
    if (bucketExists) {
      await this.minioClient.putObject(
        bucketName,
        generatedUrl,
        fileBuffer,
        metadata,
      );
      return AbstractApiResponse.created(generatedUrl as T, 'File');
    } else {
      throw new HttpException(
        {
          error: HttpStatus.BAD_REQUEST,
          status: HttpStatus.BAD_REQUEST,
          message: "bucket doesn't exist",
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async addObjects<T>(
    objects: { objectName: string; fileBuffer: Buffer; metadata: object }[],
  ): Promise<AbstractApiResponse<T>> {
    const responseData: string[] = [];

    for (const obj of objects) {
      const id = uuid();
      const contentType = obj.metadata['Content-Type'];
      const extension = MimeTypeMap[contentType];

      const sanitizedFileName = sanitizeFileName(obj.objectName);

      const generatedUrl = `${sanitizedFileName}--${id}.${extension}`;
      const bucketName = await this.config.getOrThrow('BUCKET_NAME');
      const bucketExists = await this.minioClient.bucketExists(bucketName);

      if (bucketExists) {
        await this.minioClient.putObject(
          bucketName,
          generatedUrl,
          obj.fileBuffer,
          obj.metadata,
        );
        responseData.push(encodeURIComponent(generatedUrl));
      } else {
        throw new HttpException(
          {
            error: HttpStatus.BAD_REQUEST,
            status: HttpStatus.BAD_REQUEST,
            message: "bucket doesn't exist",
            data: null,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return AbstractApiResponse.created(responseData as T);
  }

  async removeObject<T>(objectId: string) {
    const bucketName = await this.config.getOrThrow('BUCKET_NAME');
    const bucketExists = await this.minioClient.bucketExists(bucketName);
    if (bucketExists) {
      await this.minioClient.removeObject(bucketName, objectId);
      return {
        message: 'object removed successfully',
        status: HttpStatus.OK,
      } as T;
    }
  }

  getBaseUrl(presignedUrl: string): string {
    const baseUrl = presignedUrl.split('?')[0];
    return baseUrl;
  }

  async setBucketPolicy(bucketName: string): Promise<void> {
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: '*',
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${bucketName}/*`],
        },
      ],
    };

    await this.minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
  }
}
