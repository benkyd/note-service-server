import Sequelize from 'sequelize';

import {BaseDatabase} from './baseDatabase';
import {Logger} from '../logger';

export class Database extends BaseDatabase {
    static async exec(query) {
        const connection = super.Connection;
        try {
            const result = await connection.query(query);
            Logger.database(JSON.stringify(result, null, 4));
            return result[0][0].result;
        }
        catch (e) {
            Logger.error(`An error occured while querying a database: ${e}`);
        }
    }
}

Database.Users = require('./users').UserTools;
Database.Authorization = require('./tokens').TokenTools;
Database.PermaNotes = require('./permalinks').PermaLinkTools;
Database.NoteGroups = require('./notegroups').NoteGroupTools;
Database.Notes = require('./notes').NoteTools;
