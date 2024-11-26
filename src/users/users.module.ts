import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { RedisService } from '@/redis/redis.service'

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, RedisService],
})
export class UsersModule {}
