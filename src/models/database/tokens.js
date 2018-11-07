import {BaseDatabase} from './baseDatabase';
import {Logger} from '../logger';

export class TokenTools extends BaseDatabase {
    static async listAll() {
        const Auth = super.Auth;
        return Auth.findAll();
    }

    static async newToken(id, token, passHash) {
        const Auth = super.Auth;
    
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

    static async delete(id) {
        const Auth = super.Auth;

        try {
            await Auth.destroy({where: {id: id}});
            return 1;
        } catch (e) {
            Logger.error(`An error occured while deleting id ${id}: ${e}`);
            return -1;
        }
    }

    static async getTokenByID(id) {
        const Auth = super.Auth;

        try {
            let auth = await Auth.findOne({where: {id: id}});
            if (auth == null) return -1;
            return auth;
        } catch (e) {
            Logger.error(`An error occured while querying for id ${id}: ${e}`);
            return -1;
        }
    }

    static async getIDByToken(token) {
        const Auth = super.Auth;

        try {
            let auth = await Auth.findOne({where: {token: token}});
            if (auth == null) return -1;
            return auth;
        } catch (e) {
            Logger.error(`An error occured while querying for token ${token}: ${e}`);
            return -1;
        }
    }

    static async getTokenByPassHash(hash) {
        const Auth = super.Auth;

        try {
            let auth = await Auth.findOne({where: {passhash: hash}});
            if (auth == null) return -1;
            return auth;
        } catch (e) {
            Logger.error(`An error occured while querying for hash ${hash}: ${e}`);
            return -1;
        }
    }

    static async updateToken(id, newToken) {
        const Auth = super.Auth;

        try {
            await Auth.update({token: newToken}, {where: {id: id}});
            return 1;
        } catch (e) {
            Logger.error(`An error occured while updating for id ${id}: ${e}`);
            return -1;
        }
    }
}
