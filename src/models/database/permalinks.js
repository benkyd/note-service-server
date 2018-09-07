import Sequelize from 'sequelize';

import {BaseDatabase} from './baseDatabase';
import {Logger} from '../logger';

export class PermaLinkTools extends BaseDatabase {
    static async listAll() {
        let PermaNote = BaseDatabase.PermaNote;
        return PermaNote.findAll();
    }

    static async newNote(uid, endpoint, text, id) {
        let PermaNote = BaseDatabase.PermaNote;

        try {
            let note = await PermaNote.create({
                id: id,
                endpoint: endpoint,
                text: text,
                creatorid: id
            });
            return note;
        } catch (e) {
            Logger.error(`An error occured while inserting user a note with the endpoint ${endpoint} into permanote table: ${e}`);
            return -1;
        }
    }

    static async getNoteByUID(id) {
        let PermaNote = BaseDatabase.PermaNote;

        try {
            let note = await PermaNote.findOne({where: {id: id}});
            if (note == null) return -1;
            return note;
        } catch (e) {
            Logger.error(`An error occured while querying for a permanote by uid ${id}: ${e}`);
            return -1;
        }
    }

    static async getNoteByEndpoint(endpoint) {
        let PermaNote = BaseDatabase.PermaNote;

        try {
            let note = await PermaNote.findOne({where: {endpoint: endpoint}});
            if (note == null) return -1;
            return note;
        } catch (e) {
            Logger.error(`An error occured while querying for a permanote by endpoint ${endpoint}: ${e}`);
            return -1;
        }
    }
}