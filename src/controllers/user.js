import {Logger} from '../models/logger';
import {ControllerHandler} from './controllerHandler';

export class UserController extends ControllerHandler {
    static newUser(req, res, next) {
        Logger.info('NEW USER');

        let username = req.body.username || null;
        let email = req.body.email || null;
        let password = req.body.password || null;

        next();
    }
}
