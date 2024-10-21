export declare enum Status {
    SUCCESS = "success",
    FAILED = "error",
    success = "success",
    warning = "warning",
    error = "error",
    info = "info"
}
export declare class RapidMessageData {
    status: Status;
    message: string;
    constructor(message: string, status?: Status);
    setMessage(message: string): RapidMessageData;
    setStatus(status: Status): RapidMessageData;
    static success(message: string): RapidMessageData;
    static failed(message: string): RapidMessageData;
}
