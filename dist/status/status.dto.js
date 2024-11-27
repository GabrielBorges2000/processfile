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
exports.NotFoundResponseDto = exports.GetStatusResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class GetStatusResponseDto {
}
exports.GetStatusResponseDto = GetStatusResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'completed',
        description: 'O status atual do upload',
    }),
    __metadata("design:type", String)
], GetStatusResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '36d6859b-0148-4cf4-8a0a-a734dbd2c3ca',
        description: 'O ID do upload',
    }),
    __metadata("design:type", String)
], GetStatusResponseDto.prototype, "uploadId", void 0);
class NotFoundResponseDto {
}
exports.NotFoundResponseDto = NotFoundResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 404, description: 'Código de status HTTP' }),
    __metadata("design:type", Number)
], NotFoundResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Upload não encontrado! Verifique o id e tente novamente!',
        description: 'Mensagem de erro',
    }),
    __metadata("design:type", String)
], NotFoundResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Not Found', description: 'Erro padrão HTTP' }),
    __metadata("design:type", String)
], NotFoundResponseDto.prototype, "error", void 0);
//# sourceMappingURL=status.dto.js.map