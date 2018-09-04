import {BaseDatabase} from './baseDatabase';
import {Logger} from '../logger';

export class TokenTools extends BaseDatabase {
    static async listAll() {
        let Auth = BaseDatabase.Auth;
        return Auth.findAll();
    }

    static async newToken(id, token, passHash) {

    }

    static async getTokenByID(id) {

    }

    static async getIDByToken(token) {

    }

    static async getTokenByPassHash(hash) {

    }

    static async updateToken(id, newToken) {
        
    }
}
