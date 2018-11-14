import {Database} from '../database/database';

export class Auth {
    static async getUserFromToken(token) {
        const id = await Database.Authorization.getIDByToken(token);
        if (id == -1) return id;
        return await Database.Users.getUserByID(id);
    }
}
