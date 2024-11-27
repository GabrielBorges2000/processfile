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
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const env_1 = require("../env");
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisService = RedisService_1 = class RedisService extends ioredis_1.default {
    constructor() {
        super({
            host: env_1.env.REDIS_HOST,
            port: env_1.env.REDIS_PORT,
            password: env_1.env.REDIS_PASSWORD,
            username: env_1.env.REDIS_USERNAME,
        });
        this.logger = new common_1.Logger(RedisService_1.name);
        super.on('error', (error) => {
            this.logger.log('Error on Redis');
            this.logger.log(error);
            process.exit(1);
        });
        super.on('connect', () => {
            this.logger.log('Redis connected!');
        });
        super.on('reconnecting', () => {
            this.logger.log('Tentando reconectar ao Redis...');
        });
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisService);
//# sourceMappingURL=redis.service.js.map