export declare class RapidException extends Error {
    errorDetails?: any;
    constructor(message?: string);
    setErrorDetails(details: any): RapidException;
}
