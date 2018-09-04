import {BaseDatabase} from './baseDatabase';
import {Logger} from '../logger';

export class TokenTools extends BaseDatabase {
    static async listAll() {
        let Auth = BaseDatabase.Auth;
        return Auth.findAll();
    }

    static async newToken(id, token, passHash) {
        let Auth = BaseDatabase.Auth;
    
        try {
            let auth = await Auth.create({
                id: id,
                token: token,
                passhash: passHash
            });
            return auth;
        } catch (e) {
            Logger.error(`An error occured while inserting auth token: ${JSON.stringify(e.errors)}`);
            return -1;
        }
    }

    static async getTokenByID(id) {
        let Auth = BaseDatabase.Auth;

    }

    static async getIDByToken(token) {
        let Auth = BaseDatabase.Auth;

    }

    static async getTokenByPassHash(hash) {
        let Auth = BaseDatabase.Auth;

    }

    static async updateToken(id, newToken) {
        let Auth = BaseDatabase.Auth;

    }
}
