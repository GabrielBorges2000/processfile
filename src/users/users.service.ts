import { PrismaService } from '@/prisma/prisma.service'
import { RedisService } from '@/redis/redis.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private redisService: RedisService,
  ) {}

  async getData(uploadId: string, filters: any, page: number, limit: number) {
    try {
      const startTime = Date.now()

      const cacheKey = `data:${uploadId}:${JSON.stringify(filters)}:page:${page}:limit:${limit}`
      const cachedData = await this.redisService.get(cacheKey)

      if (cachedData) {
        const result = JSON.parse(cachedData)
        result.executionTime = `${Date.now() - startTime}ms`
        return result
      }

      const {
        GivenName,
        City,
        TropicalZodiac,
        Occupation,
        Vehicle,
        CountryFull,
      } = filters

      const data = await this.prisma.user.findMany({
        where: {
          uploadId,
          ...(GivenName && { GivenName }),
          ...(City && { City }),
          ...(TropicalZodiac && { TropicalZodiac }),
          ...(Occupation && { Occupation }),
          ...(Vehicle && { Vehicle }),
          ...(CountryFull && { CountryFull }),
        },
        take: limit,
        skip: (page - 1) * limit,
      })

      const totalRecords = await this.prisma.user.count({
        where: {
          uploadId,
          ...(GivenName && { GivenName }),
          ...(City && { City }),
          ...(TropicalZodiac && { TropicalZodiac }),
          ...(Occupation && { Occupation }),
          ...(Vehicle && { Vehicle }),
          ...(CountryFull && { CountryFull }),
        },
      })

      const result = {
        data,
        pagination: {
          currentPage: page,
          perPage: limit,
          totalRecords,
          totalPages: Math.ceil(totalRecords / limit),
          currentCount: data.length,
        },
        executionTime: `${Date.now() - startTime}ms`,
      }

      const dataExpireInSeconds = 60 * 60 * 2 // 2 hours

      await this.redisService.set(
        cacheKey,
        JSON.stringify(result),
        'EX',
        dataExpireInSeconds,
      )
      return result
    } catch (error) {
      throw new Error('Erro ao buscar dados: ' + error.message)
    }
  }
}
