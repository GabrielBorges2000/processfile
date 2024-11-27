import * as dotenv from 'dotenv'

import { z } from 'zod'
dotenv.config()

const envSchema = z.object({
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
  REDIS_USERNAME: z.string(),
  REDIS_PASSWORD: z.string(),
  DATABASE_URL: z.string(),
  RABBITMQ_URI: z.string(),
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error(
    '❌ Variaveis de ambientes invalidas ou faltando!',
    _env.error.format(),
  )

  throw new Error('❌ Variaveis de ambientes invalidades ou faltando!')
}

export const env = _env.data
