import {Logger} from './models/logger';
import {Config} from './config/config'
import {Server} from './server';
import {Router} from './controllers/routes/router';


init();
async function init() {
    await Config.load();
    await Server.start();
    await Router.initEndpoints();

}
 