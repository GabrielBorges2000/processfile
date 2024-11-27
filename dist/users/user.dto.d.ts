export declare class UserQueryDto {
    uploadId: string;
    page?: number;
    limit?: number;
    GivenName?: string;
    City?: string;
    TropicalZodiac?: string;
    Occupation?: string;
    Vehicle?: string;
    CountryFull?: string;
}
export declare class ServerErrorResponseDto {
    statusCode: number;
    message: string;
    error: string;
}
