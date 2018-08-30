import {Logger} from '../logger';
import {BaseUser} from './baseUser';

export class User extends BaseUser {
    constructor(id, username, password, email, ip, lastupdated, verified, authcode, timeauthed) {
        super(id, username, password, email, ip, lastupdated, verified, authcode, timeauthed);
    }

    async insertUser() {
        
    }
}
