import sha256 from 'js-sha256';
import bcrypt from 'bcrypt';

import {User} from './user';
import {Logger} from '../logger';

export class Password extends User {
    static async gen(passwordSecret) {
        let prehash = await sha256(passwordSecret);
        let toHash = Buffer.from(prehash).toString('base64');
        let salt = await bcrypt.genSaltSync(10);
        let hash = await bcrypt.hashSync(toHash, salt);

        return hash;
    }

    static async compare(password, hashToCompare) {
        try {
            let prehash = await sha256(password);
            let toHash = Buffer.from(prehash).toString('base64');
            let res = await bcrypt.compareSync(toHash, hashToCompare);
            
            return res;
        } catch (e) {
            Logger.error(`Somthing went wrong with comparing hashes: ${e}`);
        }
    }
}
