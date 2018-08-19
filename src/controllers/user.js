import {Logger} from '../models/logger';
import {ControllerHandler} from './controllerHandler';

export class UserController extends ControllerHandler {
    static newUser(req, res, next) {
        Logger.info('NEW USER');
        next();
    }
}
