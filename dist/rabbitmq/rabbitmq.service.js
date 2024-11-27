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
var RabbitmqService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitmqService = void 0;
const common_1 = require("@nestjs/common");
let RabbitmqService = RabbitmqService_1 = class RabbitmqService {
    constructor(rabbitmqService) {
        this.rabbitmqService = rabbitmqService;
        this.logger = new common_1.Logger(RabbitmqService_1.name);
    }
    async addToFileQueue(results, uploadId) {
        try {
            this.rabbitmqService.emit('process-file', {
                results,
                uploadId,
            });
            this.logger.log('Sent To Queue');
        }
        catch (error) {
            this.logger.error('Erro ao adicionar à fila', error);
            console.log(error);
            throw new common_1.HttpException('Error adding file to queue', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.RabbitmqService = RabbitmqService;
exports.RabbitmqService = RabbitmqService = RabbitmqService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('RABBITMQ_SERVICE')),
    __metadata("design:paramtypes", [Function])
], RabbitmqService);
//# sourceMappingURL=rabbitmq.service.js.map