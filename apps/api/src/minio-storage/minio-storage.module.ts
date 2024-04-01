import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestMinioModule } from 'nestjs-minio';
import { MinioStorageController } from './controllers/minio-storage.controller';
import { MinioStorageService } from './services/minio-storage.service';
import { LoggerService } from '@common/logger/logger.service';

@Module({
  imports: [
    NestMinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        endPoint: config.get<string>('MINIO_ENDPOINT'),
        port: parseInt(config.get<string>('MINIO_PORT')),
        useSSL: config.get<string>('MINIO_USE_SSL') === 'false' ? false : true,
        accessKey: config.get<string>('MINIO_ACCESS_KEY'),
        region: config.get<string>('AWS_REGION'),
        secretKey: config.get<string>('MINIO_SECRET_KEY'),
      }),
    }),
  ],
  controllers: [MinioStorageController],
  providers: [MinioStorageService, LoggerService],
})
export class MinioStorageModule {}
