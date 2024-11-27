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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getData(query) {
        const { uploadId, page = 1, limit = 20, ...filters } = query;
        return await this.usersService.getData(uploadId, filters, +page, +limit);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Recupera dados de usuários com filtros e paginação',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados recuperados com sucesso.',
        schema: {
            example: {
                data: [
                    {
                        id: '00018e44-b69d-4891-95e2-5405ab9b4e04',
                        Gender: 'male',
                        NameSet: 'Brazil',
                        Title: 'Mr.',
                        GivenName: 'Pedro',
                        Surname: 'Azevedo',
                        StreetAddress: '4196 Farland Street',
                        City: 'Chicago',
                        EmailAddress: 'PedroPereiraAzevedo@teleworm.us',
                        TropicalZodiac: 'Gemini',
                        Occupation: 'Internal auditor',
                        Vehicle: '2003 Nissan Quest',
                        CountryFull: 'United States',
                        createdAt: '2024-11-26T04:45:42.799Z',
                        updateAt: '2024-11-26T04:45:42.799Z',
                        uploadId: '8f853397-5193-447b-be20-217a403213ab',
                    },
                ],
                pagination: {
                    currentPage: 1,
                    perPage: 20,
                    totalRecords: 100000,
                    totalPages: 5000,
                    currentCount: 20,
                },
                executionTime: '120ms',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erro interno do servidor' }),
    (0, swagger_1.ApiQuery)({
        name: 'uploadId',
        required: true,
        type: String,
        description: 'ID do upload dos dados',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        description: 'Número da página para paginação',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Limite de itens por página',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'GivenName',
        required: false,
        type: String,
        description: 'Filtrar pelo nome',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'City',
        required: false,
        type: String,
        description: 'Filtrar pela cidade',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'TropicalZodiac',
        required: false,
        type: String,
        description: 'Filtrar pela zodíaco tropical',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'Occupation',
        required: false,
        type: String,
        description: 'Filtrar pela ocupação',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'Vehicle',
        required: false,
        type: String,
        description: 'Filtrar pelo veículo',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'CountryFull',
        required: false,
        type: String,
        description: 'Filtrar pela cidade',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getData", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map