import {Logger} from './models/logger';
import {Config} from './config/config'
import {DbTools} from './models/database/tools';
import {Server} from './server';
import {Router} from './controllers/routes/router';

init();
async function init() {
    await Config.load();
    await DbTools.connect();
    await DbTools.testConnection();
    await Server.start();
    await Router.initEndpoints();
}
 