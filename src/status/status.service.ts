import { PrismaService } from '@/prisma/prisma.service'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class StatusService {
  constructor(private prisma: PrismaService) {}

  async findManyStatus(): Promise<{ status: string; uploadId: string }[]> {
    const uploads = await this.prisma.upload.findMany()

    if (uploads.length === 0) {
      throw new NotFoundException('Nenhum upload encontrado!')
    }

    return uploads.map((upload) => {
      let status = 'Concluído'

      if (upload.status === 'PENDDING') {
        status = 'Em andamento'
      }

      if (upload.status === 'ERROR') {
        status = 'Erro'
      }

      return {
        status,
        uploadId: upload.id,
      }
    })
  }

  async getStatus(id: string): Promise<{ status: string; uploadId: string }> {
    const upload = await this.prisma.upload.findUnique({
      where: { id },
    })

    if (!upload) {
      throw new NotFoundException(
        'Upload não encontrado! Verifique o id e tente novamente!',
      )
    }

    let status = 'Concluído'

    if (upload.status === 'PENDDING') {
      status = 'Em andamento'
    }

    if (upload.status === 'ERROR') {
      status = 'Erro'
    }

    return {
      status,
      uploadId: upload.id,
    }
  }
}
