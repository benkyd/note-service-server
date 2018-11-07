import {ControllerHandler} from './controllerHandler';
import {API} from './api/api';
import {Notes} from '../models/notes/notes';

export class NoteController extends ControllerHandler {
    static async newNote(req, res, next) {
        const errors = new API.errors(res);

        const content = req.body.text || null;
        const creatorid = req.user.id || undefined;
        const group = req.body.parentgroup || undefined;
        let order = req.body.order || undefined;

        const user = req.user || undefined;

        if (!creatorid || !user) {
            errors.addError(403, 'Forbidden').endpoint();
            next();
            return;
        }

        if (!order) {
            errors.addError(422, 'Unprocessable entity').endpoint();
            next();
            return;
        }

        const id = await Notes.genID();

        let success;
        if (!group) {
            success = await Notes.newNote(id, content, creatorid, order);
        } else {
            const doesExist = await Notes.doesGroupExist(user.id, parentgroup);
            if (!doesExist) {
                errors.addError(422, 'Unprocessable entity', 'You are trying to create a note for a group that does not exist').endpoint();
                next();
                return;
            }
            success = await Notes.newGroupedNote(id, content, creatorid, order, parentgroup);
        }

        if (success == -1) {
            errors.addError(500, 'Internal server error').endpoint();
            next();
            return;
        }

        new API.note(res, user, id, content, order, parentgroup).endpoint();
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
