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
exports.StatusController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const status_dto_1 = require("./status.dto");
const status_service_1 = require("./status.service");
let StatusController = class StatusController {
    constructor(statusService) {
        this.statusService = statusService;
    }
    async findMany() {
        const uploads = await this.statusService.findManyStatus();
        return {
            uploads,
        };
    }
    async getStatus(id) {
        const { status, uploadId } = await this.statusService.getStatus(id);
        return {
            status,
            uploadId,
        };
    }
};
exports.StatusController = StatusController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os status de upload' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Status listados com sucesso',
        type: [status_dto_1.GetStatusResponseDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Nenhum status encontrado',
        type: status_dto_1.NotFoundResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatusController.prototype, "findMany", null);
__decorate([
    (0, common_1.Get)(':uploadId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obter o status do upload' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Status retornado com sucesso',
        type: status_dto_1.GetStatusResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Status não encontrado',
        type: status_dto_1.NotFoundResponseDto,
    }),
    __param(0, (0, common_1.Param)('uploadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StatusController.prototype, "getStatus", null);
exports.StatusController = StatusController = __decorate([
    (0, swagger_1.ApiTags)('Status'),
    (0, common_1.Controller)('status'),
    __metadata("design:paramtypes", [status_service_1.StatusService])
], StatusController);
//# sourceMappingURL=status.controller.js.map