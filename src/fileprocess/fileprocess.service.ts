import { Injectable, Logger } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import type { CsvData } from 'src/uploads/uploads.service'

@Injectable()
export class FileprocessService {
  constructor(private prisma: PrismaClient) {}
  private logger = new Logger(FileprocessService.name)

  async handleProcessFile(line: CsvData[], uploadId: string) {
    try {
      const data = line.map((lineData) => {
        return {
          Gender: lineData.Gender,
          NameSet: lineData.NameSet,
          Title: lineData.Title,
          GivenName: lineData.GivenName,
          Surname: lineData.Surname,
          StreetAddress: lineData.StreetAddress,
          City: lineData.City,
          EmailAddress: lineData.EmailAddress,
          TropicalZodiac: lineData.TropicalZodiac,
          Occupation: lineData.Occupation,
          Vehicle: lineData.Vehicle,
          CountryFull: lineData.CountryFull,
          uploadId,
        }
      })

      await this.prisma.user.createMany({
        data,
      })

      await this.prisma.upload.update({
        where: { id: uploadId },
        data: { status: 'END' },
      })

      this.logger.log('Processamento concluído com sucesso.')
    } catch (error) {
      this.logger.error('Erro ao processar dados da fila:', error)

      await this.prisma.upload.update({
        where: { id: uploadId },
        data: { status: 'ERROR' },
      })
    }
  }
}
