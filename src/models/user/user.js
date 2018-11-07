import {Logger} from '../logger';
import {BaseUser} from './baseUser';
import {Database} from '../database/database';
import { UserTools } from '../database/users';

export class User extends BaseUser {
    constructor(id, username, password, email, ip, authcode) {
        super(id, username, password, email, ip, authcode);
    }
    
    async insert() {
        this._instance = await Database.Users.newUser(this.id, this.username, this.password, this.email, this.ip, this.authcode);
        if (this._instance == -1) return -1;
        Logger.debug(`New user [${this.id}] ${this.username}`);
    }

    async delete() {
        return this._instance.delete();
    }
}

User.Token = require('./token').Token;
User.Password = require('./passwords').Password;