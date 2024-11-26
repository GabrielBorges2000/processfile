import { ApiProperty } from '@nestjs/swagger'

export class UploadSuccessResponseDto {
  @ApiProperty({
    example: 'Arquivo recebido com sucesso. Processamento iniciado.',
  })
  message: string

  @ApiProperty({ example: 'bf177efe-8104-4231-b22b-889b809960b9' })
  uploadId: string
}

export class UploadErrorResponseDto {
  @ApiProperty({ example: 'Erro ao processar o arquivo CSV' })
  message: string
}
