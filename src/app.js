import {Logger} from './models/logger';
import {Config} from './config/config'
import {Database} from './models/database/database';
import {Server} from './server';
import {Router} from './controllers/routes/router';

init();
async function init() {
    Logger.SetLevel(Logger.VERBOSE_LOGS);
    
    await Config.load();
    await Database.init();
    await Database.testConnection();
    await Server.start();
    await Router.initEndpoints();
    
    // Logger.database('Database Log');
    // Logger.middleware('GET request to /');
    // Logger.debug('Debug mode enabled');
    // Logger.info('Informatic log');
    // Logger.warn('Warning');
    // Logger.error('An error has occured');
    // Logger.panic('A fatal error has occured, exiting');
}

 