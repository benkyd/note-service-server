import {Database} from '../database/database';

export class Auth {
    static async getUserFromToken(token) {
        const id = await Database.auth.getIDByToken(token);
        if (id == -1) return id;
        return await Database.users.getUserByID(id.id);
    }
}
