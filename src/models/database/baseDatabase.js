import Sequelize from 'sequelize';

import {Logger} from '../logger';
import {Config} from '../../config/config';

let connection;

let user;
let auth;
let session;

export class BaseDatabase {
    static get Connection() {return connection}

    static async init() {
        Logger.info('Connecting to SQLite Database');

        connection = new Sequelize('database', 'user', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: Logger.database,
            operatorsAliases: false,
            storage: 'src/models/database/sqlite/database.sqlite',
        });

        user = connection.define('user', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true
            },
            username: Sequelize.TEXT,
            password: Sequelize.TEXT,
            email: Sequelize.TEXT,
            ip: Sequelize.TEXT,
            lastupdated: Sequelize.TEXT,
            verified: Sequelize.BOOLEAN,
            authcode: Sequelize.STRING,
            timeauthed: Sequelize.TEXT
        });
        
        auth = connection.define('auth', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true
            },
            selector: Sequelize.TEXT,
            validator: Sequelize.TEXT,
            uid: Sequelize.BIGINT,
            expires: Sequelize.TEXT
        });

        session = connection.define('session', {
            sessionid: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true
            },
            sessiondata: Sequelize.TEXT,
            timecreated: Sequelize.TEXT,
            timeupdated: Sequelize.TEXT
        });
        try {
            await connection.sync();
        } catch (e) {
            Logger.panic('Failed to connect to SQLite Database, error:', e)
        }
        Logger.info('Connected to SQLite Database');
    }

    static async testConnection() {

    }
}
