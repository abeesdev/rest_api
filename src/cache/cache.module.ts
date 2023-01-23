import { DynamicModule, Module } from '@nestjs/common';
import { RedisOptions } from 'ioredis';
import { CACHE_OPTIONS } from '../constants';
import { CacheService } from './cache.service';

@Module({})
export class CacheModule {
  static register(options: RedisOptions): DynamicModule {
    return {
      module: CacheModule,
      providers: [
        {
          provide: CACHE_OPTIONS,
          useValue: options,
        },
        CacheService,
      ],
      exports: [CacheService, CACHE_OPTIONS],
      global: true,
    };
  }
}
