"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileprocessModule = void 0;
const common_1 = require("@nestjs/common");
const fileprocess_service_1 = require("./fileprocess.service");
const fileprocess_controller_1 = require("./fileprocess.controller");
const client_1 = require("@prisma/client");
let FileprocessModule = class FileprocessModule {
};
exports.FileprocessModule = FileprocessModule;
exports.FileprocessModule = FileprocessModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [fileprocess_controller_1.FileprocessController],
        providers: [fileprocess_service_1.FileprocessService, client_1.PrismaClient],
    })
], FileprocessModule);
//# sourceMappingURL=fileprocess.module.js.map