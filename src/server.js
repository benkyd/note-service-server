import express from 'express'
import bodyParser from 'body-parser';

import {Logger} from './models/logger';
import {Config} from './config/config';

let app;
let server;
let router

export class Server {
    static get App() {return app} 
    static get Server() {return server}

    static async start() {
        app = express();
        server = require('http').createServer(app);
        Logger.info('Server created');

        let port = Config.Server.HTTPPort;
        try {
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.listen(port);
        } catch (e) {
            Logger.panic(`Could not open a connection on port ${port}, maybe the port is populated or permissions are not met`);
        }
        Logger.info(`HTTP service is listening at port ${port}`);
    }
}
