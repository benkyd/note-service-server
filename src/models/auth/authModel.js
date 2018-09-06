import {Database} from '../database/database';

export class AuthModel {
    static async getUserFromToken(token) {
        let id = await Database.auth.getIDByToken(token);
        return await Database.users.getUserByID(id.id);
    }
}
