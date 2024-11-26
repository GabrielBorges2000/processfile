import {
  BadRequestException,
  Controller,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadsService } from './uploads.service'
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger'
import { UploadErrorResponseDto, UploadSuccessResponseDto } from './upload.dto'

@ApiTags('Uploads')
@Controller()
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('/upload')
  @ApiOperation({ summary: 'Upload de um arquivo CSV' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Arquivo CSV para upload',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Arquivo carregado com sucesso.',
    type: UploadSuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Nenhum arquivo enviado ou arquivo inválido.',
    type: UploadErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao processar o arquivo CSV.',
    type: UploadErrorResponseDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file || file.mimetype !== 'text/csv') {
      throw new BadRequestException('Nenhum arquivo enviado ou tipo inválido.')
    }

    const maxSizeFile = 104857600 // 100MB

    if (file.size > maxSizeFile) {
      throw new BadRequestException(
        'O arquivo é muito grande. O tamanho máximo é 100MB.',
      )
    }

    try {
      const { message, uploadId } = await this.uploadsService.upload(file)
      return { message, uploadId }
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException('Erro ao processar o arquivo CSV')
    }
  }
}
