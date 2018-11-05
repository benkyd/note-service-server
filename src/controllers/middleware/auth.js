import {MiddleWare} from './index';
import {API} from '../../models/api/API';
import {Logger} from '../../models/logger'
import {AuthModel} from '../../models/auth/authModel';

export class AuthMiddleWare extends MiddleWare {
    static async authUser(req, res, next) {
        let errors = new API.errors(res);

        if (!req.headers.authorization) {
            errors.addError(403, 'Forbidden', 'You cannot access this resource without authorization').endpoint();
            return;
        }
         
        let token = req.headers.authorization;
        let user = await AuthModel.getUserFromToken(token);
        if (user == -1) {
            errors.addError(403, 'Forbidden', 'You cannot access this resource without authorization').endpoint();
            return;
        }
        
        req.user = user;
        Logger.debug(`User ${user.id} authenticated`);
        next();
    }
}
