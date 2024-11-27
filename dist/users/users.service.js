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
exports.UsersService = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor(prisma, redisService) {
        this.prisma = prisma;
        this.redisService = redisService;
    }
    async getData(uploadId, filters, page, limit) {
        try {
            const startTime = Date.now();
            const cacheKey = `data:${uploadId}:${JSON.stringify(filters)}:page:${page}:limit:${limit}`;
            const cachedData = await this.redisService.get(cacheKey);
            if (cachedData) {
                const result = JSON.parse(cachedData);
                result.executionTime = `${Date.now() - startTime}ms`;
                return result;
            }
            const { GivenName, City, TropicalZodiac, Occupation, Vehicle, CountryFull, } = filters;
            const data = await this.prisma.user.findMany({
                where: {
                    uploadId,
                    ...(GivenName && { GivenName }),
                    ...(City && { City }),
                    ...(TropicalZodiac && { TropicalZodiac }),
                    ...(Occupation && { Occupation }),
                    ...(Vehicle && { Vehicle }),
                    ...(CountryFull && { CountryFull }),
                },
                take: limit,
                skip: (page - 1) * limit,
            });
            const totalRecords = await this.prisma.user.count({
                where: {
                    uploadId,
                    ...(GivenName && { GivenName }),
                    ...(City && { City }),
                    ...(TropicalZodiac && { TropicalZodiac }),
                    ...(Occupation && { Occupation }),
                    ...(Vehicle && { Vehicle }),
                    ...(CountryFull && { CountryFull }),
                },
            });
            const result = {
                data,
                pagination: {
                    currentPage: page,
                    perPage: limit,
                    totalRecords,
                    totalPages: Math.ceil(totalRecords / limit),
                    currentCount: data.length,
                },
                executionTime: `${Date.now() - startTime}ms`,
            };
            const dataExpireInSeconds = 60 * 60 * 2;
            await this.redisService.set(cacheKey, JSON.stringify(result), 'EX', dataExpireInSeconds);
            return result;
        }
        catch (error) {
            throw new Error('Erro ao buscar dados: ' + error.message);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], UsersService);
//# sourceMappingURL=users.service.js.map