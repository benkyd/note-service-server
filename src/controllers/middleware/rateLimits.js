import {Logger} from '../../models/logger';
import {MiddleWare} from './index';

let requestsPerSecond = 2;
// let disposeTime = 20000; //ms 1800000 = 30 mins
let buckets = {}

export class RateLimits extends MiddleWare{
    static async request(req, res, next) {
        let ip = req.connection.remoteAddress;

        if (!buckets[ip]) {
            Logger.debug(`New rate limiting bucket`);
            RateLimits.newBucket(ip);
            next();
            return;
        }

        buckets[ip].lastUsed = new Date().getTime();

        if (buckets[ip].tokens.length <= 0) {
            Logger.middleware(`${ip} is being rate limited`);
            res.status(422).end('422 TO MANY REQUESTS');
            return;
        }

        buckets[ip].tokens.pop();
        next();
    }

    static newBucket(ip) {
        buckets[ip] = {ip: ip, tokens: [], lastUsed: new Date().getTime()};
        for (let i = 0; i < requestsPerSecond; i++) {
            buckets[ip].tokens.push(1);
        }
    }    

    static tick() {
        for (let bucket in buckets) {
            // if (buckets[bucket].lastUsed += disposeTime >= new Date().getTime()) {
            //     delete buckets[bucket]; // remove element here, don't redefine
            //     continue;
            // }
            if (buckets[bucket].tokens.length > requestsPerSecond) continue;
            buckets[bucket].tokens.push(1);
        }
    }

    static init() {
        Logger.info('Initialized ratelimiting middleware');
        setInterval(RateLimits.tick, 1000 / requestsPerSecond);
    }
}
