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

        app.get('/', [MiddleWare.end, Router.frontPage]);
        
        app.get('/user/:id', [MiddleWare.end]);
        app.delete('/user/:id', [MiddleWare.end]);
        app.post('/user', [MiddleWare.end, Controllers.UserController.newUser]);
        
        app.use([StatusCodes.pageNotFound]);
        Logger.info('HTTP endpoints settup');
    }

    static frontPage(req, res, next) {
        res.end('DEVELOPMENT SERVER');
    }
}
