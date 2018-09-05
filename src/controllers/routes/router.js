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

        app.get('/', [MiddleWare.RateLimits.request, Router.frontPage]);
        
        // app.get('/user/:id', [MiddleWare.RateLimits.request]);
        // app.delete('/user/:id', [MiddleWare.RateLimits.request]);
        app.post('/user', [MiddleWare.RateLimits.request, Controllers.UserController.newUser]);
        app.post('/login', [MiddleWare.RateLimits.request, Controllers.LoginController.authenticate]);

        app.post('/unauth/permanote', [MiddleWare.RateLimits.request, Controllers.PermaLinkController.unauthentacatedPermaLink]);
        app.get('/note/:endpoint', [MiddleWare.RateLimits.request, Controllers.PermaLinkController.getNote]);

        app.get('*', [MiddleWare.RateLimits.request, StatusCodes.pageNotFound]);
        Logger.info('HTTP endpoints settup');
    }

    static frontPage(req, res, next) {
        res.end('DEVELOPMENT SERVER');
    }
}
