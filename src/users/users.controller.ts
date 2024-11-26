import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Recupera dados de usuários com filtros e paginação',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados recuperados com sucesso.',
    schema: {
      example: {
        data: [
          {
            id: '00018e44-b69d-4891-95e2-5405ab9b4e04',
            Gender: 'male',
            NameSet: 'Brazil',
            Title: 'Mr.',
            GivenName: 'Pedro',
            Surname: 'Azevedo',
            StreetAddress: '4196 Farland Street',
            City: 'Chicago',
            EmailAddress: 'PedroPereiraAzevedo@teleworm.us',
            TropicalZodiac: 'Gemini',
            Occupation: 'Internal auditor',
            Vehicle: '2003 Nissan Quest',
            CountryFull: 'United States',
            createdAt: '2024-11-26T04:45:42.799Z',
            updateAt: '2024-11-26T04:45:42.799Z',
            uploadId: '8f853397-5193-447b-be20-217a403213ab',
          },
        ],
        pagination: {
          currentPage: 1,
          perPage: 20,
          totalRecords: 100000,
          totalPages: 5000,
          currentCount: 20,
        },
        executionTime: '120ms',
      },
    },
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @ApiQuery({
    name: 'uploadId',
    required: true,
    type: String,
    description: 'ID do upload dos dados',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número da página para paginação',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limite de itens por página',
  })
  @ApiQuery({
    name: 'GivenName',
    required: false,
    type: String,
    description: 'Filtrar pelo nome',
  })
  @ApiQuery({
    name: 'City',
    required: false,
    type: String,
    description: 'Filtrar pela cidade',
  })
  @ApiQuery({
    name: 'TropicalZodiac',
    required: false,
    type: String,
    description: 'Filtrar pela zodíaco tropical',
  })
  @ApiQuery({
    name: 'Occupation',
    required: false,
    type: String,
    description: 'Filtrar pela ocupação',
  })
  @ApiQuery({
    name: 'Vehicle',
    required: false,
    type: String,
    description: 'Filtrar pelo veículo',
  })
  @ApiQuery({
    name: 'CountryFull',
    required: false,
    type: String,
    description: 'Filtrar pela cidade',
  })
  async getData(@Query() query: any) {
    const { uploadId, page = 1, limit = 20, ...filters } = query

    return await this.usersService.getData(uploadId, filters, +page, +limit)
  }
}
