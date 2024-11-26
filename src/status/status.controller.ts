import { Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetStatusResponseDto, NotFoundResponseDto } from './status.dto'
import { StatusService } from './status.service'

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os status de upload' })
  @ApiResponse({
    status: 200,
    description: 'Status listados com sucesso',
    type: [GetStatusResponseDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum status encontrado',
    type: NotFoundResponseDto,
  })
  async findMany() {
    const uploads = await this.statusService.findManyStatus()

    return {
      uploads,
    }
  }

  @Get(':uploadId')
  @ApiOperation({ summary: 'Obter o status do upload' })
  @ApiResponse({
    status: 200,
    description: 'Status retornado com sucesso',
    type: GetStatusResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Status não encontrado',
    type: NotFoundResponseDto,
  })
  async getStatus(@Param('uploadId') id: string) {
    const { status, uploadId } = await this.statusService.getStatus(id)

    return {
      status,
      uploadId,
    }
  }
}
