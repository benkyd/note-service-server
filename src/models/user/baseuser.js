import {Logger} from '../logger';

export class BaseUser {
    constructor(id, username, password, email, ip, authcode) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.ip = ip;
        this.authcode = authcode;
    }
}
