import {Logger} from '../models/logger';
import {ControllerHandler} from './controllerHandler';
import {API} from '../models/api/api';
import {Database} from '../models/database/database'
import {PermaLink} from '../models/permalinks/permalink';

export class NoteController extends ControllerHandler {
    static async newNote(req, res, next) {
        Logger.debug(JSON.stringify(req.user));
        

        next();
    }
}
