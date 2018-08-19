import {Logger} from '../../models/logger';
import {Server} from '../../server';
import {MiddleWare} from '../middleware';
import {StatusCodes} from '../status';

let app;

export class Router {
    static async initEndpoints() {
        Logger.info('Setting up API HTTP endpoints');
        
        app = Server.App;
        app.get('/', [MiddleWare.analytics, Router.frontPage]);
        
        app.get('/user/:id', (req, res) => [MiddleWare.analytics, Controllers.getUser]);
        app.delete('/user/:id', (req, res) => {});
        app.post('/user', (req, res) => {});
        
        app.use([MiddleWare.analytics, StatusCodes.pageNotFound]);
        Logger.info('HTTP endpoints settup');
    }

    static frontPage(req, res, next) {
        res.end('DEVELOPMENT SERVER');
    }
}
