import {Groups} from './groups';
import {Database} from '../database/database';

export class Notes extends Groups {
    static async newNote(id, content, creatorid, order) {
        Database.notes.newNote(id, null, )
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
