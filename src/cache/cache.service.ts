import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis, { Callback, RedisKey, RedisOptions } from 'ioredis';
import { CACHE_OPTIONS } from '../constants';

@Injectable()
export class CacheService {
  private redis: Redis;
  private logger = new Logger(CacheService.name);

  constructor(@Inject(CACHE_OPTIONS) private options: RedisOptions) {
    this.logger.log(`Connect to redis host ${this.options.host}`);
    this.redis = new Redis(this.options);
  }

  async get(key: RedisKey, callback?: Callback<string | null>) {
    return await this.redis.get(key, callback);
  }

  get store() {
    return this.redis;
  }
}
