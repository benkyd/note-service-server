import {Logger} from '../../../models/logger';

export class ErrorHandler {
    static async newError(err, req, res, next) {
        // Logger.error(JSON.stringify(err));
        err.endpoint();
    }
}
