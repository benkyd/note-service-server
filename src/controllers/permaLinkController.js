import {Logger} from '../models/logger';
import {ControllerHandler} from './controllerHandler';
import {API} from '../models/api/api';
import {Database} from '../models/database/database'
import {PermaLink} from '../models/permalinks/permalink';

export class PermaLinkController extends ControllerHandler {
    static async unauthentacatedPermaLink(req, res, next) {
        let errors = new API.errors(res);
    
        let text = req.body.content || undefined;
        if (!content) {
            errors.addError(422, 'Unprocessable entity', 'There is no text');
            errors.endpoint();
            next();
            return;
        }

        let uid = await PermaLink.genUID() || new Date().getTime();
        let endpoint = await PermaLink.genEndpoint();

        let success = await Database.permalink.newNote(uid, endpoint, content);

        if (success == -1) {
            errors.addError(500, 'Internal server error');
            errors.endpoint();
            next();
            return;
        }

        new API.permalink(res, content, uid, endpoint).endpoint();
        next();
    }

    static async getNote(req, res, next) {
        let endpoint = req.params.endpoint || undefined;

        if (!endpoint) {
            next();
            return;
        }

        let data = await Database.permalink.getNoteByEndpoint(endpoint);
        if (data == -1) {
            next();
            return;
        }

        res.end(data.text);
        next();
    }
}
