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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusService = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let StatusService = class StatusService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findManyStatus() {
        const uploads = await this.prisma.upload.findMany();
        if (uploads.length === 0) {
            throw new common_1.NotFoundException('Nenhum upload encontrado!');
        }
        return uploads.map((upload) => {
            let status = 'Concluído';
            if (upload.status === 'PENDDING') {
                status = 'Em andamento';
            }
            if (upload.status === 'ERROR') {
                status = 'Erro';
            }
            return {
                status,
                uploadId: upload.id,
            };
        });
    }
    async getStatus(id) {
        const upload = await this.prisma.upload.findUnique({
            where: { id },
        });
        if (!upload) {
            throw new common_1.NotFoundException('Upload não encontrado! Verifique o id e tente novamente!');
        }
        let status = 'Concluído';
        if (upload.status === 'PENDDING') {
            status = 'Em andamento';
        }
        if (upload.status === 'ERROR') {
            status = 'Erro';
        }
        return {
            status,
            uploadId: upload.id,
        };
    }
};
exports.StatusService = StatusService;
exports.StatusService = StatusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StatusService);
//# sourceMappingURL=status.service.js.map