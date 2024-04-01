import { Test, TestingModule } from '@nestjs/testing';
import { MinioStorageService } from './minio-storage.service';
import { LoggerService } from '@common/logger/logger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestMinioModule } from 'nestjs-minio';

describe('MinioStorageService', () => {
  let service: MinioStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        NestMinioModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            endPoint: config.get<string>('MINIO_ENDPOINT'),
            port: parseInt(config.get<string>('MINIO_PORT')),
            useSSL:
              config.get<string>('MINIO_USE_SSL') === 'false' ? false : true,
            accessKey: config.get<string>('MINIO_ACCESS_KEY'),
            secretKey: config.get<string>('MINIO_SECRET_KEY'),
          }),
        }),
      ],
      providers: [MinioStorageService, LoggerService, ConfigService],
    }).compile();

    service = module.get<MinioStorageService>(MinioStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
