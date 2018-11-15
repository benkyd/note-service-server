import {Logger} from '../models/logger';
import {ControllerHandler} from './controllerHandler';
import {API} from './api/api';
import {Database} from '../models/database/database'
import {PermaLink} from '../models/permalinks/permalink';

export class PermaNoteController extends ControllerHandler {
    static async newPermaNote(req, res, next) {
        const errors = new API.errors(res);

        const content = req.body.content || undefined;
        if (!content) {
            errors.addError(422, 'Unprocessable entity', 'There is no content');
            return next(errors);
        }

        const uid = await PermaLink.genUID() || new Date().getTime();
        const endpoint = await PermaLink.genEndpoint();

        const success = await Database.PermaNotes.newNote(uid, endpoint, content);
        if (success == -1) {
            errors.addError(500, 'Internal server error');
            return next(errors);
        }

        new API.permalink(res, content, uid, endpoint).endpoint();
        next();
    }

    static async getPermaNote(req, res, next) {
        const endpoint = req.params.endpoint || undefined;

        if (!endpoint) return;

        const data = await Database.PermaNotes.getNoteByEndpoint(endpoint);
        if (data == -1) {
            res.status(404).end('404 Not Found');
            return;
        }

        res.end(data.text);
        next();
    }
}
