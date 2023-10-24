export enum Status {
    SUCCESS = "success",
    FAILED = "error",
    success = "success",
    warning = "warning",
    error = "error",
    info = "info"
}

export class RapidMessageData {

    public status: Status;
    public message: string;

    constructor(message: string, status: Status = Status.FAILED) {
        this.status = status;
        this.message = message;
    }

    public setMessage(message: string): RapidMessageData {
        this.message = message;
        return this;
    }

    public setStatus(status: Status): RapidMessageData {
        this.status = status;
        return this;
    }

    public static success(message: string) {
        return new RapidMessageData(message).setStatus(Status.SUCCESS);
    }


    public static failed(message: string) {
        return new RapidMessageData(message).setStatus(Status.FAILED);
    }

}