import {Logger} from '../models/logger';
import {ControllerHandler} from './controllerHandler';
import {API} from '../models/api/api';
import {Database} from '../models/database/database'
import {Notes} from '../models/notes/notes';

export class NoteController extends ControllerHandler {
    static async newNote(req, res, next) {
        let errors = new API.errors(res);
        // Logger.debug(JSON.stringify(req.user, false, 4));

        let content = req.body.text || null;
        let creatorid = req.user.id || undefined;
        let group = req.body.parentgroup || undefined;
        let order = req.body.order || undefined;

        let user = req.user || undefined;

        if (!creatorid || !user) {
            errors.addError(403, 'Forbidden');
            errors.endpoint();
            next();
            return;
        }

        if (!order) {
            errors.addError(422, 'Unprocessable entity');
            errors.endpoint();
            next();
            return;
        }

        let id = await Notes.genID();

        let success;
        
        if (!group) {
            await Notes.newNote(id, content, creatorid, order);
        } else {
            let doesExist = await Notes.doesGroupExist();
            if (!doesExist) {
                errors.addError(422, 'Unprocessable entity', 'The group you are trying to create this note in does not exist');
                errors.endpoint();
                next();
                return;
            }
            await Notes.newGroupedNote(id, content, creatorid, order, parentgroup);
        }

        next();
    }

    static async 
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
