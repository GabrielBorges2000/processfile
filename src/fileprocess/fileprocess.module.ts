import { Module } from '@nestjs/common'
import { FileprocessService } from './fileprocess.service'
import { FileprocessController } from './fileprocess.controller'
import { PrismaClient } from '@prisma/client'

@Module({
  imports: [],
  controllers: [FileprocessController],
  providers: [FileprocessService, PrismaClient],
})
export class FileprocessModule {}
