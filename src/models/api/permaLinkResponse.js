import {API} from './API';
import {PermaLink} from '../../models/permalinks/permalink';

export class PermaLinkAPI extends API {
    constructor(res, text, uid, endpoint, username, id) {
        super();
        this.res = res;
        this.response = {
            status: {
                error: false,
                code: 201,
                type: 'created',
                message: 'Success'
            },
            data: [
                {
                    status: 'Resource created',
                    note: {
                        uid: uid,
                        endpoint: `/api/note/${endpoint}`,
                        text: text,
                        createdby: username,
                        id: id
                    }
                }
            ]
        }
    }

    endpoint() {
        this.res.status(201).end(JSON.stringify(this.response, false, 4));
    }
}
