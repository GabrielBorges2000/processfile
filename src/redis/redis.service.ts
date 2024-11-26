import { Injectable, Logger } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class RedisService extends Redis {
  private logger = new Logger(RedisService.name)

  constructor() {
    super()

    super.on('error', (error) => {
      this.logger.log('Error on Redis')
      this.logger.log(error)
      process.exit(1)
    })

    super.on('connect', () => {
      this.logger.log('Redis connected!')
    })
  }
}
