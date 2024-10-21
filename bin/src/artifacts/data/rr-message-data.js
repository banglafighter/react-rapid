export var Status;
(function (Status) {
    Status["SUCCESS"] = "success";
    Status["FAILED"] = "error";
    Status["success"] = "success";
    Status["warning"] = "warning";
    Status["error"] = "error";
    Status["info"] = "info";
})(Status || (Status = {}));
export class RapidMessageData {
    constructor(message, status = Status.FAILED) {
        this.status = status;
        this.message = message;
    }
    setMessage(message) {
        this.message = message;
        return this;
    }
    setStatus(status) {
        this.status = status;
        return this;
    }
    static success(message) {
        return new RapidMessageData(message).setStatus(Status.SUCCESS);
    }
    static failed(message) {
        return new RapidMessageData(message).setStatus(Status.FAILED);
    }
}
