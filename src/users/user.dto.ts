import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UserQueryDto {
  @ApiPropertyOptional({ description: 'ID do upload dos dados' })
  uploadId: string

  @ApiPropertyOptional({
    description: 'Número da página para paginação',
    type: Number,
  })
  page?: number

  @ApiPropertyOptional({
    description: 'Limite de itens por página',
    type: Number,
  })
  limit?: number

  @ApiPropertyOptional({ description: 'Filtrar pelo nome' })
  GivenName?: string

  @ApiPropertyOptional({ description: 'Filtrar pela cidade' })
  City?: string

  @ApiPropertyOptional({ description: 'Filtrar pelo zodíaco tropical' })
  TropicalZodiac?: string

  @ApiPropertyOptional({ description: 'Filtrar pela ocupação' })
  Occupation?: string

  @ApiPropertyOptional({ description: 'Filtrar pelo veículo' })
  Vehicle?: string

  @ApiPropertyOptional({ description: 'Filtrar pelo país completo' })
  CountryFull?: string
}

export class ServerErrorResponseDto {
  @ApiProperty({ example: 500, description: 'Código de status HTTP' })
  statusCode: number

  @ApiProperty({
    example: 'Erro interno do servidor! Tente novamente mais tarde.',
    description: 'Mensagem de erro',
  })
  message: string

  @ApiProperty({
    example: 'Internal Server Error',
    description: 'Erro padrão HTTP',
  })
  error: string
}
