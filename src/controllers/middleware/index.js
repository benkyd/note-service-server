import stringify from 'json-stringify-safe';

import {Logger} from '../../models/logger';

export class MiddleWare {
    static async end(req, res, next) {
        await MiddleWare.RateLimits.request(req, res, next);
        await MiddleWare.analytics(req, res, next);
    }

    static analytics(req, res, next) {
        // TODO: Send data such as IP to an anyaltitics model
        Logger.middleware(`${req.method} request to ${req.url}`)
        next();
    }

    static newUser(req, res, next) { 
        next();
    }
}

MiddleWare.RateLimits = require('./rateLimits').RateLimits;
MiddleWare.Auth = require('./auth').AuthMiddleWare;
