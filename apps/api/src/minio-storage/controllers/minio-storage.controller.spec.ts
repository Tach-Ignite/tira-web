import { Test, TestingModule } from '@nestjs/testing';
import { MinioStorageController } from './minio-storage.controller';
import { MinioStorageService } from '../services/minio-storage.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerService } from '@common/logger/logger.service';
import { NestMinioModule } from 'nestjs-minio';

describe('MinioStorageController', () => {
  let controller: MinioStorageController;

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
      controllers: [MinioStorageController],
      providers: [MinioStorageService, LoggerService, ConfigService],
    }).compile();

    controller = module.get<MinioStorageController>(MinioStorageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
