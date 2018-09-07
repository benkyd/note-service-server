import {BaseDatabase} from './baseDatabase';
import {Logger} from '../logger';

export class NoteTools extends BaseDatabase {
    static async newNote(id, content, creatorid, order, parentgroup) {
        parentgroup = parentgroup || null;
        let Note = BaseDatabase.Note;

        try {
            let note = await Note.create({
                id: id,
                content: content,
                parentgroup: parentgroup,
                creatorid: creatorid,
                order: order,
                catergory: null,
                endpoint: null,
                lastupdated: new Date().getTime()
            });
            return note;
        } catch (e) {
            Logger.error(`An error occured while inserting group ${id}: ${e}`);
            return -1;
        }
    }

    static async deleteNote(id) {
        let Note = BaseDatabase.Note;

        try {
            await Note.destroy({where: {id: id}});
            return 1;
        } catch (e) {
            Logger.error(`An error occured while inserting group ${id}: ${e}`);
            return -1;
        }
    }

    static async makePermaLink(id, endpoint) {
        let Note = BaseDatabase.Note;

        try {
            await Note.update({endpoint: endpoint}, {where: {id: id}});
            await this.updateLastUpdateTime(id);
        } catch (e) {
            Logger.error(`An error occured while inserting group ${id}: ${e}`);
            return -1;
        }
    }

    static async getNoteByEndpoint(endpoint) {
        let Note = BaseDatabase.Note;

        try {
            let note = await Note.findOne({where: {endpoint: endpoint}});
            if (note == null) return -1;
            return note;
        } catch (e) {
            Logger.error(`An error occured while inserting group ${id}: ${e}`);
            return -1;
        }
    }

    static async updateNote(id, newContent) {
        let Note = BaseDatabase.Note;

        try {
            await Note.update({content: newContent}, {where: {id: id}});
            await this.updateLastUpdatedTime(id);
            return 1;
        } catch (e) {
            Logger.error(`An error occured while inserting group ${id}: ${e}`);
            return -1;
        }
    }

    static async updateCatergory(id, newCatergory) {
        let Note = BaseDatabase.Note;

        try {
            await Note.update({catergory: newCatergory}, {where: {id: id}});
            await this.updateLastUpdatedTime(id);
            return 1;
        } catch (e) {
            Logger.error(`An error occured while inserting group ${id}: ${e}`);
            return -1;
        }
    }

    static async reorderNote(id, newOrder) {
        let Note = BaseDatabase.Note;

        try {
            await Note.update({order: newOrder}, {where: {id: id}});
            await this.updateLastUpdatedTime(id);
            return 1;
        } catch (e) {
            Logger.error(`An error occured while inserting group ${id}: ${e}`);
            return -1;
        }
    }

    static async renameNote(id, newName) {
        let Note = BaseDatabase.Note;

        try {
            await Note.update({name: newName}, {where: {id: id}});
            await this.updateLastUpdatedTime(id);
            return 1;
        } catch (e) {
            Logger.error(`An error occured while inserting group ${id}: ${e}`);
            return -1;
        }
    }
    
    static async getNoteByID(id) {
        let Note = BaseDatabase.Note;

        try {
            let note = await Note.findOne({where: {id: id}});
            if (note == null) return -1;
            return note;
        } catch (e) {
            Logger.error(`An error occured while inserting group ${id}: ${e}`);
            return -1;
        }
    }

    static async getAllUserNotes(userid) {
        let Note = BaseDatabase.Note;

        try {
            let note = await Note.findAll({where: {creatorid: userid}});
            if (note == null) return -1;
            return note;
        } catch (e) {
            Logger.error(`An error occured while inserting group ${id}: ${e}`);
            return -1;
        }
    }

    static async getAllGroupedNotes(groupid) {
        let Note = BaseDatabase.Note;

        try {
            let note = await Note.findAll({where: {parentgroup: groupid}});
            if (note == null) return -1;
            return note;
        } catch (e) {
            Logger.error(`An error occured while inserting group ${id}: ${e}`);
            return -1;
        }
    }

    static async updateLastUpdateTime(id) {
        let Note = BaseDatabase.Note;

        try {
            await Note.update({lastupdated: new Date().getTime()}, {where: {id: id}});
            return 1;
        } catch (e) {
            Logger.error(`An error occured while inserting group ${id}: ${e}`);
            return -1;
        }
    }
}
