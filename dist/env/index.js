"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv = require("dotenv");
const zod_1 = require("zod");
dotenv.config();
const envSchema = zod_1.z.object({
    REDIS_HOST: zod_1.z.string(),
    REDIS_PORT: zod_1.z.coerce.number(),
    REDIS_USERNAME: zod_1.z.string(),
    REDIS_PASSWORD: zod_1.z.string(),
    DATABASE_URL: zod_1.z.string(),
    RABBITMQ_URI: zod_1.z.string(),
    PORT: zod_1.z.coerce.number().default(3333),
    NODE_ENV: zod_1.z
        .enum(['development', 'test', 'production'])
        .default('development'),
});
const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.error('❌ Variaveis de ambientes invalidas ou faltando!', _env.error.format());
    throw new Error('❌ Variaveis de ambientes invalidades ou faltando!');
}
exports.env = _env.data;
//# sourceMappingURL=index.js.map