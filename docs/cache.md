# Service Layer Cache

This Document demonstrates how to use caching in a Backend (Nest) application to improve performance and reduce load on your backend services.

## Introduction

Caching is a technique to store frequently accessed data in a temporary storage area so that future requests for that data can be served faster. In NestJS, caching can be implemented using the `@nestjs/cache-manager` module.

## Supported Methods

- In Memory Storage
- Redis Storage

## Configuration

In your application's main module (usually app.module.ts), import the CacheModule and configure it:

### Default (In Memory Cache Storage)

```(javascript)
import { Module, CacheModule } from '@nestjs/common';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // seconds
      max: 100, // maximum number of items in cache
    }),
  ],
})
export class AppModule {}
```

### Usage

In `Controller` file, Import and configure `CacheInterceptor` as given as below

```
@Controller()
export class ProductController {
  @Get('products')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('product-findAll) // Overrides Default CacheKey
  @CacheTTL(1000) // Overrides Default Cache TTL Time
  findAll(): string[] {
    return [];
  }
}
```

### Redis

To Use `redis` as cache store need to import `cache-manager-redis-store` and configure the host and port details

````
```(javascript)
import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';


@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // seconds
      max: 100, // maximum number of items in cache
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      username: process.env.REDIS_USER_NAME,
      password: process.env.REDIS_PASSWORD,
    }),
  ],
})
export class AppModule {}
````
