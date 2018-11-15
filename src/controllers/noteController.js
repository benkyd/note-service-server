import {ControllerHandler} from './controllerHandler';
import {API} from './api/api';
import {Notes} from '../models/notes/notes';
import {Logger} from '../models/logger'

export class NoteController extends ControllerHandler {
    static async newNote(req, res, next) {
        const errors = new API.errors(res);

        const content = req.body.content || null;
        const group = req.body.parentgroup || undefined;
        let order = req.body.order || undefined;
        
        const user = req.user || undefined;

        if (!order) {
            errors.addError(422, 'Unprocessable entity', 'Unprocessable entity, no order provided');
            return next(errors);
        }

        const id = await Notes.genID();

        let success;
        if (!group) {
            success = await Notes.newNote(id, content, req.user, order);
        } else {
            const doesExist = await Notes.doesGroupExist(user.id, parentgroup);
            if (!doesExist) {
                errors.addError(422, 'Unprocessable entity', 'You are trying to create a note for a group that does not exist');
                return next(errors);
            }
            success = await Notes.newGroupedNote(id, content, req.user, order, parentgroup);
        }

        if (success == -1) {
            errors.addError(500, 'Internal server error');
            return next(errors);
        }

        new API.note(res, user, id, content, order, parentgroup).endpoint();
        next();
    }
}

// id: id,
// content: content,
// parentgroup: parentgroup,
// req.user: req.user,
// order: order,
// catergory: null,
// endpoint: null,
// lastupdated: new Date().getTime()

// static async newNote(id, content, req.user, order, parentgroup) {
