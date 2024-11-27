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
var FileprocessService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileprocessService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let FileprocessService = FileprocessService_1 = class FileprocessService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(FileprocessService_1.name);
    }
    async handleProcessFile(line, uploadId) {
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
                };
            });
            await this.prisma.user.createMany({
                data,
            });
            await this.prisma.upload.update({
                where: { id: uploadId },
                data: { status: 'END' },
            });
            this.logger.log('Processamento concluído com sucesso.');
        }
        catch (error) {
            this.logger.error('Erro ao processar dados da fila:', error);
            await this.prisma.upload.update({
                where: { id: uploadId },
                data: { status: 'ERROR' },
            });
        }
    }
};
exports.FileprocessService = FileprocessService;
exports.FileprocessService = FileprocessService = FileprocessService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], FileprocessService);
//# sourceMappingURL=fileprocess.service.js.map