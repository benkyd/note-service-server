import {API} from './API';

export class APIErrors extends API {
    // get errors() {return this.errors}
    // set errors(err) {this.errors = err}

    constructor(res) {
        super()
        this.res = res;
        this.errors = {
            status: {
                error: true,
                code: undefined,
                type: undefined,
                message: undefined
            },
            error: {
                errors: []
            }
        }
    }

    addError(statusCode, message, verbose) {
        this.errors.error.errors.push({status: statusCode, title: message, detail: verbose});
        this.errors.status.code = statusCode;
        this.errors.status.type = message;
        this.errors.status.message = verbose;
    }

    count() {
        return this.errors.error.errors.length;
    }

    endpoint() {
        this.res.setHeader('Content-type', 'application/json');
        this.res.status(this.errors.status.code);
        this.res.end(JSON.stringify(this.errors, false, 4));
    }
}
