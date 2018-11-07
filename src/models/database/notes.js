import {BaseDatabase} from './baseDatabase';
import {Logger} from '../logger';

export class NoteTools extends BaseDatabase {
    static async listAll() {
        const Note = super.Note;
        return Note.findAll();
    }

    static async newNote(id, content, creatorid, order, parentgroup) {
        parentgroup = parentgroup || null;
        const Note = super.Note;

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
            Logger.error(`An error occured while inserting note ${id}: ${e}`);
            return -1;
        }
    }

    static async deleteNote(id) {
        const Note = super.Note;

        try {
            await Note.destroy({where: {id: id}});
            return 1;
        } catch (e) {
            Logger.error(`An error occured while deleting note ${id}: ${e}`);
            return -1;
        }
    }

    static async makePermaLink(id, endpoint) {
        const Note = super.Note;

        try {
            await Note.update({endpoint: endpoint}, {where: {id: id}});
            await this.updateLastUpdateTime(id);
        } catch (e) {
            Logger.error(`An error occured while editing note ${id}: ${e}`);
            return -1;
        }
    }

    static async getNoteByEndpoint(endpoint) {
        const Note = super.Note;

        try {
            let note = await Note.findOne({where: {endpoint: endpoint}});
            if (note == null) return -1;
            return note;
        } catch (e) {
            Logger.error(`An error occured while getting note ${id}: ${e}`);
            return -1;
        }
    }

    static async updateNote(id, newContent) {
        const Note = super.Note;

        try {
            await Note.update({content: newContent}, {where: {id: id}});
            await this.updateLastUpdatedTime(id);
            return 1;
        } catch (e) {
            Logger.error(`An error occured while updating note ${id}: ${e}`);
            return -1;
        }
    }

    static async updateCatergory(id, newCatergory) {
        const Note = super.Note;

        try {
            await Note.update({catergory: newCatergory}, {where: {id: id}});
            await this.updateLastUpdatedTime(id);
            return 1;
        } catch (e) {
            Logger.error(`An error occured while updating note catergory ${id}: ${e}`);
            return -1;
        }
    }

    static async reorderNote(id, newOrder) {
        const Note = super.Note;

        try {
            await Note.update({order: newOrder}, {where: {id: id}});
            await this.updateLastUpdatedTime(id);
            return 1;
        } catch (e) {
            Logger.error(`An error occured while reordering note ${id}: ${e}`);
            return -1;
        }
    }

    static async renameNote(id, newName) {
        const Note = super.Note;

        try {
            await Note.update({name: newName}, {where: {id: id}});
            await this.updateLastUpdatedTime(id);
            return 1;
        } catch (e) {
            Logger.error(`An error occured while renaming note ${id}: ${e}`);
            return -1;
        }
    }
    
    static async getNoteByID(id) {
        const Note = super.Note;

        try {
            let note = await Note.findOne({where: {id: id}});
            if (note == null) return -1;
            return note;
        } catch (e) {
            Logger.error(`An error occured while getting note ${id}: ${e}`);
            return -1;
        }
    }

    static async getAllUserNotes(userid) {
        const Note = super.Note;

        try {
            let note = await Note.findAll({where: {creatorid: userid}});
            if (note == null) return -1;
            return note;
        } catch (e) {
            Logger.error(`An error occured while getting notes from ${userid}: ${e}`);
            return -1;
        }
    }

    static async getAllGroupedNotes(groupid) {
        const Note = super.Note;

        try {
            let note = await Note.findAll({where: {parentgroup: groupid}});
            if (note == null) return -1;
            return note;
        } catch (e) {
            Logger.error(`An error occured while getting notes from group ${groupid}: ${e}`);
            return -1;
        }
    }

    static async updateLastUpdateTime(id) {
        const Note = super.Note;

        try {
            await Note.update({lastupdated: new Date().getTime()}, {where: {id: id}});
            return 1;
        } catch (e) {
            Logger.error(`An error occured while updating note update time ${id}: ${e}`);
            return -1;
        }
    }
}
