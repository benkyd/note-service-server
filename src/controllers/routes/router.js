import {Logger} from '../../models/logger';
import {Server} from '../../server';
import {MiddleWare} from '../middleware/index';
import {StatusCodes} from '../status';
import {Controllers} from '../index';

let app;

export class Router {
    static async initEndpoints() {
        Logger.info('Setting up API HTTP endpoints');

        app = Server.App;

        app.get('/', [MiddleWare.RateLimits.request, MiddleWare.analytics, Router.frontPage]);
        
        app.get('/user/:id', [MiddleWare.RateLimits.request, MiddleWare.analytics,]);
        app.delete('/user/:id', [MiddleWare.RateLimits.request, MiddleWare.analytics,]);
        app.post('/user', [MiddleWare.RateLimits.request, MiddleWare.analytics, Controllers.UserController.newUser]);
        
        app.get('*', [MiddleWare.RateLimits.request, StatusCodes.pageNotFound]);
        Logger.info('HTTP endpoints settup');
    }

    static frontPage(req, res, next) {
        res.end('DEVELOPMENT SERVER');
    }
}
