import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@prisma_/prisma.module';
// import * as redisStore from 'cache-manager-redis-store';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LoggerService } from '@common/logger/logger.service';
import { ProductsModule } from './products/products.module';
import { MinioStorageModule } from './minio-storage/minio-storage.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { CartsModule } from './carts/carts.module';
import { UserRoleModule } from './user-role/user-role.module';
import { RolesGuard } from './auth/guards/role-auth.guard';
import { FavoritesModule } from './favorites/favorites.module';
import { CategoriesModule } from './categories/categories.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { AdminProfilesModule } from './admin-profiles/admin-profiles.module';
import { AdminNotificationsModule } from './admin-notifications/admin-notifications.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { OrdersModule } from './orders/orders.module';
import { AddressesModule } from './addresses/addresses.module';
import { PaymentServiceModule } from './payment-service/payment-service.module';
import { CommonAuthGuard } from './auth/guards/common-auth.guard';
import { CognitoAuthGuard } from './auth/guards/cognito-auth.guard';
import { CognitoStrategy } from './auth/strategies/cognito.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { DashboardModule } from './dashboard/dashboard.module';
import { CacheModule } from '@nestjs/cache-manager';
import { CorrelationIdMiddleware } from '@common/correlation/correlation.middleware';
import { ServicesModule } from './services/services.module';
import { BookingsModule } from './bookings/bookings.module';
import { UserProfilesModule } from './user-profiles/user-profiles.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      // store: redisStore,
      // host: process.env.REDIS_HOST,
      // port: process.env.REDIS_PORT,
      // username: process.env.REDIS_USER_NAME, // new property
      // password: process.env.REDIS_PASSWORD, // new property
      // no_ready_check: true,
      ttl: 3000,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    EmailModule,
    AuthModule,
    ProductsModule,
    MinioStorageModule,
    ThrottlerModule.forRoot([
      {
        ttl: +process.env.RATE_LIMIT_TTL,
        limit: +process.env.RATE_LIMIT_REQUESTS,
      },
    ]),
    CartsModule,
    UserRoleModule,
    FavoritesModule,
    CategoriesModule,
    InquiriesModule,
    AdminProfilesModule,
    AdminNotificationsModule,
    EventEmitterModule.forRoot(),
    OrdersModule,
    AddressesModule,
    PaymentServiceModule,
    DashboardModule,
    ServicesModule,
    BookingsModule,
    UserProfilesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerService,
    ...(process.env.AUTH_PROVIDER === 'cognito'
      ? [JwtAuthGuard, CognitoAuthGuard, JwtStrategy, CognitoStrategy]
      : [JwtAuthGuard, JwtStrategy]),
    {
      provide: APP_GUARD,
      useClass: CommonAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    EmailService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationIdMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
