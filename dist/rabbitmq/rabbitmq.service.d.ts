import type { ClientProxy } from '@nestjs/microservices';
export declare class RabbitmqService {
    private rabbitmqService;
    private logger;
    constructor(rabbitmqService: ClientProxy);
    addToFileQueue(results: any, uploadId: string): Promise<void>;
}
