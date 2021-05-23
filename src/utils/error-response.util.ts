export class ErrorResponse extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;

        Error.captureStackTrace(this);
    }
}
