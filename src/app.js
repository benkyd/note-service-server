import {Logger} from './models/logger';
import {Config} from './config/config'
import {Database} from './models/database/database';
import {Server} from './server';
import {Router} from './controllers/routes/router';
import {middleware, MiddleWare} from './controllers/middleware/index';

import {User} from './models/user/user';

init();
async function init() {
    Logger.init('logs.log');
    Logger.SetLevel(Logger.VERBOSE_LOGS);
    Logger.SetDialect('SQLITE');

    await Config.load();
    await Database.init();
    await Database.testConnection();
    await Server.start();
    await Router.initEndpoints();
    await MiddleWare.RateLimits.init();
    
    Logger.ready();
    
    // Logger.debug(JSON.stringify(await Database.users.getUserByID(12341356), null, 4));
    // Logger.debug(JSON.stringify(await Database.users.listAll(), null, 4));
    // await new User(1234135, 'plane000', 'adifl', 'playsplane@gmail.com', '127.0.0.1', new Date().getTime(), false, 'SGASGD', -1).insert();

    // Logger.database('Database Log');
    // Logger.middleware('GET request to /');
    // Logger.debug('Debug mode enabled');
    // Logger.info('Informatic log');
    // Logger.warn('Warning');
    // Logger.error('An error has occured');
    // Logger.panic('A fatal error has occured, exiting');
}
