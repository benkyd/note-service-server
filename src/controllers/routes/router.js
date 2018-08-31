import {Logger} from '../../models/logger';
import {Server} from '../../server';
import {MiddleWare} from '../middleware';
import {StatusCodes} from '../status';
import {Controllers} from '../index';

let app;

export class Router {
    static async initEndpoints() {
        Logger.info('Setting up API HTTP endpoints');

        app = Server.App;

        app.get('/', [MiddleWare.analytics, Router.frontPage]);
        
        app.get('/user/:id', [MiddleWare.analytics]);
        app.delete('/user/:id', [MiddleWare.analytics]);
        app.post('/user', [MiddleWare.analytics, Controllers.UserController.newUser]);
        
        app.use([StatusCodes.pageNotFound]);
        Logger.info('HTTP endpoints settup');
    }

    static frontPage(req, res, next) {
        res.end('DEVELOPMENT SERVER');
    }
}
