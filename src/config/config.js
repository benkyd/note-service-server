import fs from 'fs';

import {Logger} from '../models/logger';

let server;
let database;

export class Config {
    static get Server() {return server}
    static get Database() {return database}

    static async load() {
        Logger.info('Loading config');

        try {
            let temp = fs.readFileSync('src/config/configs/server.json')
            server = JSON.parse(temp);

            if (!server.HTTPPort) throw new Error('ERROR LOADING: Server HTTP port not defined in: src/config/configs/server.json');
            if (!server.SocketPort) throw new Error('ERROR LOADING: Server Socket port not defined in: src/config/configs/server.json');
            Logger.info('LOADED: src/config/configs/server.json')
        } catch (e) {
            Logger.panic('ERROR LOADING: src/config/configs/server.json');
        }

        try {
            let temp = fs.readFileSync('src/config/configs/database.json');
            database = JSON.parse(temp);

            if (!database.host) throw new Error('ERRROR LOADING: Database host not defined in: src/config/configs/database.json');
            if (!database.user) throw new Error('ERRROR LOADING: Database user not defined in: src/config/configs/database.json');
            if (!database.password) throw new Error('ERRROR LOADING: Database password not defined in: src/config/configs/database.json');
            if (!database.database) throw new Error('ERRROR LOADING: Database database not defined in: src/config/configs/database.json');
            Logger.info('LOADED: src/config/configs/database.json');
        } catch (e) {
            Logger.panic('ERROR LOADING: src/config/configs/database.json');
        }

        Logger.info('Config loaded');
    }
}
