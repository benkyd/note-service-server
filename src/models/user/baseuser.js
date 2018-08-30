import {Logger} from '../logger';

export class BaseUser {
    constructor(id, username, password, email, ip, lastupdated, verified, authcode, timeauthed) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.ip = ip;
        this.lastupdated = lastupdated;
        this.verified = verified;
        this.authcode = authcode;
        this.timeauthed = timeauthed;
    }
}
