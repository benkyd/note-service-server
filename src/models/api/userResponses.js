import {API} from './API';

export class User extends API {
    constructor(res, id, username, email, updated, token) {
        super();
        this.res = res;
        this.response = {
            status: {
                error: false,
                code: 200,
                type: 'success',
                message: 'Success'
            },
            data: [
                {
                    status: 'Authenticated',
                    user: {
                        id: id,
                        username: username,
                        email: email,
                        updated: updated
                    },
                    token: token
                }
            ]
        }
    }

    endpoint() {
        this.res.setHeader('Content-type', 'application/json');
        this.res.status(200);
        this.res.end(JSON.stringify(this.response, false, 4));
    }
}
