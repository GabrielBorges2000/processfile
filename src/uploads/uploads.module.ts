import { Module } from '@nestjs/common'
import { UploadsController } from './uploads.controller'
import { UploadsService } from './uploads.service'
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module'
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service'

@Module({
  imports: [RabbitmqModule],
  controllers: [UploadsController],
  providers: [UploadsService, RabbitmqService],
})
export class UploadsModule {}
