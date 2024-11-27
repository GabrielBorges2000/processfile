import { NestFactory } from '@nestjs/core'
import { env } from '@/env'
import { Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function start() {
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice({
    name: 'RABBITMQ_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [env.RABBITMQ_URI],
      queue: 'process-file',
      queueOptions: {
        durable: false,
      },
    },
  })

  app.connectMicroservice({
    name: 'REDIS_SERVICE',
    transport: Transport.REDIS,
    options: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASSWORD,
      username: env.REDIS_USERNAME,
      tls: {
        rejectUnauthorized: true,
      },
    },
  })

  const config = new DocumentBuilder()
    .setTitle('Process File')
    .setDescription('Routes documentation to view file processing api routes')
    .setVersion('1.0')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, documentFactory)

  await app.startAllMicroservices()
  app.enableCors()
  await app.listen(env.PORT ?? 3333)
}

start()
