import { Controller } from '@nestjs/common'
import { FileprocessService } from './fileprocess.service'
import { EventPattern, Payload } from '@nestjs/microservices'

@Controller()
export class FileprocessController {
  constructor(private readonly fileprocessService: FileprocessService) {}

  @EventPattern('process-file')
  public async handleProcessFile(
    @Payload() message: { results: any[]; uploadId: string },
  ) {
    this.fileprocessService.handleProcessFile(message.results, message.uploadId)
  }
}
