import { StatusService } from './status.service';
export declare class StatusController {
    private statusService;
    constructor(statusService: StatusService);
    findMany(): Promise<{
        uploads: {
            status: string;
            uploadId: string;
        }[];
    }>;
    getStatus(id: string): Promise<{
        status: string;
        uploadId: string;
    }>;
}
