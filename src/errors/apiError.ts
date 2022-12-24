export class ApiError extends Error {
    name = 'Controller Error';

    status: number;

    message: string;

    constructor(status: number, msg: string) {
        super(msg);
        this.status = status;
        this.message = msg;
    }
}
