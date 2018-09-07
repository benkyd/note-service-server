import Sequelize from 'sequelize';

import {Logger} from '../logger';
import {Config} from '../../config/config';

let connection;

let User;
let Auth;
let PermaNote;
let Group;
let Note;

export class BaseDatabase { 
    static get Connection() {return connection;}
    static get User() {return User}
    static get Auth() {return Auth}
    static get PermaNote() {return PermaNote}
    static get Group() {return Group}
    static get Note() {return Note}

    static async init() {
        Logger.info('Connecting to SQLite Database');

        connection = new Sequelize('database', 'user', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: Logger.database,
            operatorsAliases: false,
            storage: 'src/models/database/sqlite/database.sqlite',
        });

        User = connection.define('user', {
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
            authcode: Sequelize.TEXT,
            timeauthed: Sequelize.TEXT
        }, {
            tableName: `user` 
        });
        
        Auth = connection.define('auth', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true
            },
            token: Sequelize.TEXT,
            passhash: Sequelize.TEXT
        }, {
            tableName: `auth` 
        });

        PermaNote = connection.define('permanote', {
            uid: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true
            },
            endpoint: Sequelize.TEXT,
            text: Sequelize.TEXT,
            creatorid: {
                type: Sequelize.BIGINT,
                allowNull: true
            }
        }, {
            tableName: `permanote`
        });

        Group = connection.define('group', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true
            },
            creatorid: Sequelize.BIGINT,
            order: Sequelize.INTEGER,
            lastupdated: Sequelize.TEXT
        }, {
            tableName: `group`
        });

        Note = connection.define('note', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                unique: true
            },
            content: Sequelize.TEXT,
            parentgroup: {
                type: Sequelize.BIGINT,
                allowNull: true
            },
            creatorid: Sequelize.BIGINT,
            order: Sequelize.INTEGER,
            catergory: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            endpoint: {
                type: Sequelize.TEXT,
                allowNull: true,
                unique: true
            },
            lastupdated: Sequelize.TEXT
        }, {
            tableName: `note`
        });

        try {
            await connection.sync({force: false});
        } catch (e) {
            Logger.panic('Failed to connect to SQLite Database, error:', e)
        }
        Logger.info('Connected to SQLite Database');
    }

    static async testConnection() {

    }
}
