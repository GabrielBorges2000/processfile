import { FileprocessService } from './fileprocess.service';
export declare class FileprocessController {
    private readonly fileprocessService;
    constructor(fileprocessService: FileprocessService);
    handleProcessFile(message: {
        results: any[];
        uploadId: string;
    }): Promise<void>;
}
