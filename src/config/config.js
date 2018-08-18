import fs from 'fs';

import {Logger} from '../models/logger';

let server;

export class Config {
    static get Server() {return server}
    
    static async load() {
        try {
            let temp = fs.readFileSync('src/config/configs/server.json')
            server = JSON.parse(temp);
        } catch (e) {
            Logger.panic('ERROR LOADING: src/config/configs/server.json');
        }

        Logger.info('Config loaded');
    }
}
