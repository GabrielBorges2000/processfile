import { Module } from '@nestjs/common'

import { PrismaModule } from './prisma/prisma.module'
import { UploadsModule } from './uploads/uploads.module'
import { RabbitmqModule } from './rabbitmq/rabbitmq.module'
import { StatusModule } from './status/status.module'
import { FileprocessModule } from './fileprocess/fileprocess.module'
import { RedisModule } from './redis/redis.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    PrismaModule,
    UploadsModule,
    RabbitmqModule,
    StatusModule,
    FileprocessModule,
    RedisModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
