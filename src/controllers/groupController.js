import {ControllerHandler} from './controllerHandler';
import {API} from '../models/api/api';
import {Notes} from '../models/notes/notes';

export class GroupController extends ControllerHandler {
    static async newGroup(req, res, next) {
        let errors = new API.errors(res);


        next()
    }



}

