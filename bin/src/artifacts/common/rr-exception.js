export class RapidException extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'RapidException';
    }
    setErrorDetails(details) {
        this.errorDetails = details;
        return this;
    }
}
