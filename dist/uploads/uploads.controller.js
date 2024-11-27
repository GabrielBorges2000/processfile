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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const uploads_service_1 = require("./uploads.service");
const swagger_1 = require("@nestjs/swagger");
const upload_dto_1 = require("./upload.dto");
let UploadsController = class UploadsController {
    constructor(uploadsService) {
        this.uploadsService = uploadsService;
    }
    async uploadFile(file) {
        if (!file || file.mimetype !== 'text/csv') {
            throw new common_1.BadRequestException('Nenhum arquivo enviado ou tipo inválido.');
        }
        const maxSizeFile = 104857600;
        if (file.size > maxSizeFile) {
            throw new common_1.BadRequestException('O arquivo é muito grande. O tamanho máximo é 100MB.');
        }
        try {
            const { message, uploadId } = await this.uploadsService.upload(file);
            return { message, uploadId };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Erro ao processar o arquivo CSV');
        }
    }
};
exports.UploadsController = UploadsController;
__decorate([
    (0, common_1.Post)('/upload'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload de um arquivo CSV' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Arquivo CSV para upload',
        required: true,
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Arquivo carregado com sucesso.',
        type: upload_dto_1.UploadSuccessResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Nenhum arquivo enviado ou arquivo inválido.',
        type: upload_dto_1.UploadErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Erro ao processar o arquivo CSV.',
        type: upload_dto_1.UploadErrorResponseDto,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "uploadFile", null);
exports.UploadsController = UploadsController = __decorate([
    (0, swagger_1.ApiTags)('Uploads'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [uploads_service_1.UploadsService])
], UploadsController);
//# sourceMappingURL=uploads.controller.js.map