"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UploadsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const csv = require("csv-parser");
const node_stream_1 = require("node:stream");
const prisma_service_1 = require("../prisma/prisma.service");
const rabbitmq_service_1 = require("../rabbitmq/rabbitmq.service");
let UploadsService = UploadsService_1 = class UploadsService {
    constructor(prisma, rabbitmqService) {
        this.prisma = prisma;
        this.rabbitmqService = rabbitmqService;
        this.logger = new common_1.Logger(UploadsService_1.name);
    }
    async upload(file) {
        const upload = await this.prisma.upload.create({
            data: {
                status: 'PENDDING',
            },
        });
        const results = [];
        const readableBufferStream = new node_stream_1.Readable();
        readableBufferStream.push(file.buffer);
        readableBufferStream.push(null);
        return new Promise((resolve, reject) => {
            readableBufferStream
                .pipe(csv())
                .on('data', (data) => {
                results.push(data);
            })
                .on('end', async () => {
                try {
                    this.rabbitmqService.addToFileQueue(results, upload.id);
                    this.logger.log('Sent To Queue');
                    resolve({
                        message: 'Arquivo recebido com sucesso. Processamento iniciado.',
                        uploadId: upload.id,
                    });
                }
                catch (error) {
                    await this.prisma.upload.update({
                        where: { id: upload.id },
                        data: { status: 'ERROR' },
                    });
                    reject(error);
                }
            })
                .on('error', async (error) => {
                await this.prisma.upload.update({
                    where: { id: upload.id },
                    data: { status: 'ERROR' },
                });
                reject(error);
            });
        });
    }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = UploadsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        rabbitmq_service_1.RabbitmqService])
], UploadsService);
//# sourceMappingURL=uploads.service.js.map