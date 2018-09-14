import {Logger} from '../models/logger';
import {ControllerHandler} from './controllerHandler';
import {API} from '../models/api/api';
import {Database} from '../models/database/database'
import {PermaLink} from '../models/permalinks/permalink';

export class NoteController extends ControllerHandler {
    static async newNote(req, res, next) {
        let errors = new API.errors(res);
        // Logger.debug(JSON.stringify(req.user, false, 4));

        let content = req.body.text || undefined;
        let creatorid = req.user.id || undefined;
        let group = req.body.parentgroup || undefined;
        let order = req.body.order || undefined;

        let user = req.user || undefined;

        if (!creatorid || !user) errors.addError(403, 'Forbidden');
        
        if (errors.count() > 0) {
            errors.endpoint();
            next();
            return;
        }

        if (!group) group == 0;

        
        
        // what the hecking heck is this code supoased to do you hecking idiot

        next();
    }
}

// id: id,
// content: content,
// parentgroup: parentgroup,
// creatorid: creatorid,
// order: order,
// catergory: null,
// endpoint: null,
// lastupdated: new Date().getTime()

// static async newNote(id, content, creatorid, order, parentgroup) {
