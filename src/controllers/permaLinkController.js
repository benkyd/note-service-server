import {Logger} from '../models/logger';
import {ControllerHandler} from './controllerHandler';
import {API} from './api/api';
import {Database} from '../models/database/database'
import {PermaLink} from '../models/permalinks/permalink';

export class PermaLinkController extends ControllerHandler {
    static async unauthentacatedPermaLink(req, res, next) {
        const errors = new API.errors(res);
    
        const content = req.body.content || undefined;
        if (!content) {
            errors.addError(422, 'Unprocessable entity', 'There is no text').endpoint();
            next();
            return;
        }

        const uid = await PermaLink.genUID() || new Date().getTime();
        const endpoint = await PermaLink.genEndpoint();

        const success = await Database.PermaNotes.newNote(uid, endpoint, content);
        if (success == -1) {
            errors.addError(500, 'Internal server error').endpoint();
            next();
            return;
        }

        new API.permalink(res, content, uid, endpoint).endpoint();
        next();
    }

    static async getNote(req, res, next) {
        const endpoint = req.params.endpoint || undefined;

        if (!endpoint) {
            next();
            return;
        }

        const data = await Database.PermaNotes.getNoteByEndpoint(endpoint);
        if (data == -1) {
            next();
            return;
        }

        res.end(data.text);
        next();
    }
}
