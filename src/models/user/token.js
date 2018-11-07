import jwt from 'jsonwebtoken';

import {User} from './user';

export class Token extends User {
    static async gen(status, clientID, clientSecret) {
        const preGen = clientID + ':' + clientSecret;

        const token = await jwt.sign(status, preGen);
        return token;
    }

    static async check() {
        
    }
}
