import { PrismaClient } from '@prisma/client';
import type { CsvData } from 'src/uploads/uploads.service';
export declare class FileprocessService {
    private prisma;
    constructor(prisma: PrismaClient);
    private logger;
    handleProcessFile(line: CsvData[], uploadId: string): Promise<void>;
}
