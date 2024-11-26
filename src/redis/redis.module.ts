import { Global, Module } from '@nestjs/common'
import { RedisService } from './redis.service'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REDIS_SERVICE',
        transport: Transport.REDIS,
      },
    ]),
  ],
  providers: [RedisService],
  exports: [RedisService, ClientsModule],
})
export class RedisModule {}
