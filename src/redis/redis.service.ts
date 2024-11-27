import { env } from '@/env'
import { Injectable, Logger } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class RedisService extends Redis {
  private logger = new Logger(RedisService.name)

  constructor() {
    super({
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASSWORD,
      username: env.REDIS_USERNAME,

    })

    super.on('error', (error) => {
      this.logger.log('Error on Redis')
      this.logger.log(error)
      process.exit(1)
    })

    super.on('connect', () => {
      this.logger.log('Redis connected!')
    })

    super.on('reconnecting', () => {
      this.logger.log('Tentando reconectar ao Redis...')
    })
  }
}
