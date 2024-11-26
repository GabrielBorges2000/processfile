import { Module } from '@nestjs/common'
import { RabbitmqService } from './rabbitmq.service'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { env } from 'src/env'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [env.RABBITMQ_URI],
          queue: 'process-file',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [RabbitmqService],
  exports: [RabbitmqService, ClientsModule],
})
export class RabbitmqModule {}
