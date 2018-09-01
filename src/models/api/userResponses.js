import {API} from './API';

export class User extends API {
    constructor(res, id, username, email, updated, token) {
        super();
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
        this.res.status(200).end(JSON.stringify(this.response, false, 4));
    }
}
