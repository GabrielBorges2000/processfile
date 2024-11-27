"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const env_1 = require("./env");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function start() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        name: 'RABBITMQ_SERVICE',
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [env_1.env.RABBITMQ_URI],
            queue: 'process-file',
            queueOptions: {
                durable: false,
            },
        },
    });
    app.connectMicroservice({
        name: 'REDIS_SERVICE',
        transport: microservices_1.Transport.REDIS,
        options: {
            host: env_1.env.REDIS_HOST,
            port: env_1.env.REDIS_PORT,
            password: env_1.env.REDIS_PASSWORD,
            username: env_1.env.REDIS_USERNAME,
        },
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Process File')
        .setDescription('Routes documentation to view file processing api routes')
        .setVersion('1.0')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, documentFactory);
    await app.startAllMicroservices();
    app.enableCors();
    await app.listen(env_1.env.PORT ?? 3333);
}
start();
//# sourceMappingURL=main.js.map