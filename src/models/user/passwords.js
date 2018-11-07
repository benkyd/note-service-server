import sha256 from 'js-sha256';
import bcrypt from 'bcrypt';

import {User} from './user';
import {Logger} from '../logger';

export class Password extends User {
    static async gen(passwordSecret) {
        const prehash = await sha256(passwordSecret);
        const toHash = Buffer.from(prehash).toString('base64');
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(toHash, salt);

        return hash;
    }

    static async compare(password, hashToCompare) {
        try {
            const prehash = await sha256(password);
            const toHash = Buffer.from(prehash).toString('base64');
            const res = await bcrypt.compareSync(toHash, hashToCompare);
            
            return res;
        } catch (e) {
            Logger.error(`Somthing went wrong with comparing hashes: ${e}`);
        }
    }
}
