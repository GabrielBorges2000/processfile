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
exports.ServerErrorResponseDto = exports.UserQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserQueryDto {
}
exports.UserQueryDto = UserQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID do upload dos dados' }),
    __metadata("design:type", String)
], UserQueryDto.prototype, "uploadId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Número da página para paginação',
        type: Number,
    }),
    __metadata("design:type", Number)
], UserQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Limite de itens por página',
        type: Number,
    }),
    __metadata("design:type", Number)
], UserQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filtrar pelo nome' }),
    __metadata("design:type", String)
], UserQueryDto.prototype, "GivenName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filtrar pela cidade' }),
    __metadata("design:type", String)
], UserQueryDto.prototype, "City", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filtrar pelo zodíaco tropical' }),
    __metadata("design:type", String)
], UserQueryDto.prototype, "TropicalZodiac", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filtrar pela ocupação' }),
    __metadata("design:type", String)
], UserQueryDto.prototype, "Occupation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filtrar pelo veículo' }),
    __metadata("design:type", String)
], UserQueryDto.prototype, "Vehicle", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filtrar pelo país completo' }),
    __metadata("design:type", String)
], UserQueryDto.prototype, "CountryFull", void 0);
class ServerErrorResponseDto {
}
exports.ServerErrorResponseDto = ServerErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500, description: 'Código de status HTTP' }),
    __metadata("design:type", Number)
], ServerErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Erro interno do servidor! Tente novamente mais tarde.',
        description: 'Mensagem de erro',
    }),
    __metadata("design:type", String)
], ServerErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Internal Server Error',
        description: 'Erro padrão HTTP',
    }),
    __metadata("design:type", String)
], ServerErrorResponseDto.prototype, "error", void 0);
//# sourceMappingURL=user.dto.js.map