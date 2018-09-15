import {Groups} from './groups';
import {Database} from '../database/database';

export class Notes extends Groups {
    static async newNote(id, content, creatorid, order) {

        
        Database.notes.newNote(id, null, )
    }

    static async genID() {
        return new Date().getTime();
    }

    static async genEndpoint() {
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        let endpoint;
        while (true) {
            endpoint = 'N';
            for (let i = 0; i < 7; i++)
                endpoint += possible[Math.floor(Math.random() * possible.length)];

            if (await Database.notes.getNoteByEndpoint(endpoint) == -1)
                break;
        }

        return endpoint;
    }

    static async getNoteByEndpoint(endpoint) {

    }

    static async makeNotePerma(id, endpoint) {

    } 

    static async newGroupedNote(id, content, creatorid, order, parentgroup) {

    }

    static async reorderNote(id, newPosition) {

    }

    static async regroupNote(id, groupid) {

    }
    
    static async deleteNote(id) {

    }
}
