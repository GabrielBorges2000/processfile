import { PrismaService } from '../prisma/prisma.service';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';
export interface CsvData {
    Gender: string;
    NameSet: string;
    Title: string;
    GivenName: string;
    Surname: string;
    StreetAddress: string;
    City: string;
    EmailAddress: string;
    TropicalZodiac: string;
    Occupation: string;
    Vehicle: string;
    CountryFull: string;
}
export declare class UploadsService {
    private prisma;
    private rabbitmqService;
    private readonly logger;
    constructor(prisma: PrismaService, rabbitmqService: RabbitmqService);
    upload(file: Express.Multer.File): Promise<{
        message: string;
        uploadId: string;
    }>;
}
