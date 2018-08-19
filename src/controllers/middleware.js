import stringify from 'json-stringify-safe';

import {Logger} from '../models/logger';

export class MiddleWare {
    static analytics(req, res, next) {
        // TODO: Send data such as IP to an anyaltitics model
        Logger.info(`${req.method} request to ${req.url}`)
        next();
    }

    static newUser(req, res, next) { 
        next();
    }
}
