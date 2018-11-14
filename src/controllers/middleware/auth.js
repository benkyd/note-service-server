import {MiddleWare} from './middleware';
import {API} from '../api/api';
import {Logger} from '../../models/logger'
import {Auth} from '../../models/auth/authModel';

export class AuthMiddleWare extends MiddleWare {
    static async authUser(req, res, next) {
        const errors = new API.errors(res);

        if (!req.headers.authorization) {
            errors.addError(403, 'Forbidden', 'You cannot access this resource without authorization');
            next(errors);
            return;
        }
         
        const token = req.headers.authorization;
        const user = await Auth.getUserFromToken(token);
        if (user == -1 || !user.id) {
            errors.addError(403, 'Forbidden', 'You cannot access this resource without authorization');
            next(errors);
            return;
        }
        
        req.user = user;
        Logger.debug(`User ${user.id} authenticated`);
        next();
    }
}
