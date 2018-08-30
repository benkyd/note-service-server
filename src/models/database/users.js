import Sequelize from 'sequelize';

import {BaseDatabase} from './baseDatabase';
import {Logger} from '../logger';
import {Config} from '../../config/config';

export class UserTools extends BaseDatabase {
    static async listAll() {
        let User = BaseDatabase.User;
        return User.findAll();
    }
 
    static async newUser(id, username, password, email, ip, authcode) {
        let User = BaseDatabase.User;
        try {
            let user = await User.create({
                id: id,
                username: username,
                password: password,
                email: email,
                ip: ip,
                lastupdated: new Date().getTime().toString(),
                verified: false,
                authcode: authcode,
                timeauthed: '-1'
            });
        } catch (e) {
            Logger.error(`An error occured while inserting user ${username}, id ${id} into users table: ${JSON.stringify(e.errors)}`);
            return -1;
        }
    }

    static async getUserByID(id) {

    }
}
