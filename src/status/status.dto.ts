import { ApiProperty } from '@nestjs/swagger'

export class GetStatusResponseDto {
  @ApiProperty({
    example: 'completed',
    description: 'O status atual do upload',
  })
  status: string

  @ApiProperty({
    example: '36d6859b-0148-4cf4-8a0a-a734dbd2c3ca',
    description: 'O ID do upload',
  })
  uploadId: string
}

export class NotFoundResponseDto {
  @ApiProperty({ example: 404, description: 'Código de status HTTP' })
  statusCode: number

  @ApiProperty({
    example: 'Upload não encontrado! Verifique o id e tente novamente!',
    description: 'Mensagem de erro',
  })
  message: string

  @ApiProperty({ example: 'Not Found', description: 'Erro padrão HTTP' })
  error: string
}
