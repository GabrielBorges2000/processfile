import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common'
import type { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class RabbitmqService {
  private logger = new Logger(RabbitmqService.name)

  constructor(
    @Inject('RABBITMQ_SERVICE') private rabbitmqService: ClientProxy,
  ) {}

  async addToFileQueue(results: any, uploadId: string) {
    try {
      this.rabbitmqService.emit('process-file', {
        results,
        uploadId,
      })

      this.logger.log('Sent To Queue')
    } catch (error) {
      this.logger.error('Erro ao adicionar à fila', error)

      console.log(error)

      throw new HttpException(
        'Error adding file to queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
