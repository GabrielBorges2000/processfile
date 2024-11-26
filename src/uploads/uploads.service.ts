import { Injectable, Logger } from '@nestjs/common'
import * as csv from 'csv-parser'
import { Readable } from 'node:stream'
import { PrismaService } from '../prisma/prisma.service'

import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service'

export interface CsvData {
  Gender: string
  NameSet: string
  Title: string
  GivenName: string
  Surname: string
  StreetAddress: string
  City: string
  EmailAddress: string
  TropicalZodiac: string
  Occupation: string
  Vehicle: string
  CountryFull: string
}

@Injectable()
export class UploadsService {
  private readonly logger = new Logger(UploadsService.name)

  constructor(
    private prisma: PrismaService,
    private rabbitmqService: RabbitmqService,
  ) {}

  async upload(
    file: Express.Multer.File,
  ): Promise<{ message: string; uploadId: string }> {
    const upload = await this.prisma.upload.create({
      data: {
        status: 'PENDDING',
      },
    })

    const results: CsvData[] = []
    const readableBufferStream = new Readable()
    readableBufferStream.push(file.buffer)
    readableBufferStream.push(null)

    return new Promise((resolve, reject) => {
      readableBufferStream
        .pipe(csv())
        .on('data', (data: CsvData) => {
          results.push(data)
        })
        .on('end', async () => {
          try {
            this.rabbitmqService.addToFileQueue(results, upload.id)

            this.logger.log('Sent To Queue')

            resolve({
              message: 'Arquivo recebido com sucesso. Processamento iniciado.',
              uploadId: upload.id,
            })
          } catch (error) {
            await this.prisma.upload.update({
              where: { id: upload.id },
              data: { status: 'ERROR' },
            })
            reject(error)
          }
        })
        .on('error', async (error) => {
          await this.prisma.upload.update({
            where: { id: upload.id },
            data: { status: 'ERROR' },
          })
          reject(error)
        })
    })
  }
}
