import { PrismaService } from '@/prisma/prisma.service';
import { RedisService } from '@/redis/redis.service';
export declare class UsersService {
    private prisma;
    private redisService;
    constructor(prisma: PrismaService, redisService: RedisService);
    getData(uploadId: string, filters: any, page: number, limit: number): Promise<any>;
}
