import {Logger} from '../../models/logger';
import {Server} from '../../server';

let app;

export class Router {

    static async initEndpoints() {
        Logger.info('Setting up API HTTP endpoints');
        
        app = Server.App;

        app.get('/', (req, res) => {
            res.end('DEV SERVER');
        });

        app.get('/user/:id', (req, res) => {});
        app.delete('/user/:id', (req, res) => {});
        app.post('/user', (req, res) => {});
        
        Logger.info('HTTP endpoints settup');
    }
}
