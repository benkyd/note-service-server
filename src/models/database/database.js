import mysql from 'mysql';

import {Logger} from '../logger';
import {Config} from '../../config/config';

let connection;

export class Database {
    static get Connection() {return connection}

    static async connect() {
        Logger.info('Connecting to mySQL database');
        let promise = new Promise((resolve, reject) => {
            connection = mysql.createConnection(Config.Database);

            connection.connect((err) => {
                if (err) {
                    Logger.panic('Failed to connect to the database as user ' + Config.Database.user);
                    reject();
                }
                Logger.info('Connected to mySQL as id ' + connection.threadId);
                resolve();
            });
        });
        await promise;
    }

    static async testConnection() {
        let promise = new Promise((resolve, reject) => {
            connection.query('SELECT 1 + 1 AS solution', async function (err, results, fields) {
                if (err) {
                    Logger.panic('Failed to query the database');
                    reject();
                }
                Logger.info('Database connection tested and secure');
                resolve();
            });
        });
        await promise;
    }
}
