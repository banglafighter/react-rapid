export class RapidException extends Error {

    errorDetails?: any

    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'RapidException';
    }

    public setErrorDetails(details: any): RapidException {
        this.errorDetails = details
        return this;
    }

}