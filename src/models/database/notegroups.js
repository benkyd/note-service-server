import {BaseDatabase} from './baseDatabase';
import {Logger} from '../logger';

export class NoteGroupTools extends BaseDatabase {
    static async listAll() {
        let Group = BaseDatabase.Group;
        return Group.findAll();
    }

    static async newGroup(id, creatorid, order) {
        const Group = super.Group;

        try {
            let group = await Group.create({
                id: id,
                creatorid: creatorid,
                order: order,
                lastupdated: new Date().getTime()
            });
            return group;
        } catch (e) {
            Logger.error(`An error occured while inserting group ${id}: ${e}`);
            return -1;
        }
    }

    static async deleteGroup(id) {
        const Group = super.Group;

        try {
            await Group.destroy({where: {id: id}});
            return 1;
        } catch (e) {
            Logger.error(`An error occured while deleting group ${id}: ${e}`);
            return -1;
        }
    }

    static async renameGroup(id, newName) {
        const Group = super.Group;

        try {
            await Group.update({name: newName}, {where: {id: id}});
            await this.updateLastUpdatedTime(id);
            return 1;
        } catch (e) {
            Logger.error(`An error occured while updating group ${id}: ${e}`);
            return -1;
        }
    }

    static async reorderGroup(id, newPosition) {
        const Group = super.Group;

        try {
            await Group.update({order: newPosition}, {where: {id: id}});
            await this.updateLastUpdatedTime(id);
            return 1;
        } catch (e) {
            Logger.error(`An error occured while updating group ${id}: ${e}`);
            return -1;
        }
    }

    static async getGroupByID(id) {
        const Group = super.Group;

        try {
            let group = await Group.findOne({where: {id: id}});
            if (group == null) return -1;
            return group;
        } catch (e) {
            Logger.error(`An error occured while getting group ${id}: ${e}`);
            return -1;
        }
    }

    static async getAllUsersGroups(userid) {
        const Group = super.Group;

        try {
            let group = Group.findAll({where: {creatorid: userid}});
            if (group == null) return -1;
            return group;
        } catch (e) {
            Logger.error(`An error occured while getting groups from ${userid}: ${e}`);
            return -1;
        }
    }

    static async updateLastUpdatedTime(id) {
        const Group = super.Group;

        try {
            await Group.update({lastupdated: new Date().getTime()}, {where: {id: id}});
            return 1;
        } catch (e) {
            Logger.error(`An error occured while updating group ${id}: ${e}`);
            return -1;
        }
    }
}
