import { PrismaService } from '@/prisma/prisma.service';
export declare class StatusService {
    private prisma;
    constructor(prisma: PrismaService);
    findManyStatus(): Promise<{
        status: string;
        uploadId: string;
    }[]>;
    getStatus(id: string): Promise<{
        status: string;
        uploadId: string;
    }>;
}
