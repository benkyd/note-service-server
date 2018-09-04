import sha256 from 'js-sha256';
import bcrypt from 'bcrypt';

import {User} from './user';
import {Logger} from '../logger';

export class Password extends User {
    static async gen(passwordSecret) {
        let salt = await bcrypt.genSaltSync(10);
        let prehash = await sha256(passwordSecret)
        let hash = await bcrypt.hashSync(prehash, salt);

        return hash;
    }

    static async compare(password, hashToCompare) {
        try {
            let prehash = await sha256(password);
            let res = await bcrypt.compareSync(prehash, hashToCompare);
            return res;
        } catch (e) {
            Logger.error(`Somthing went wrong with comparing password hashes: ${e}`);
        }
    }
}
