import {API} from './API';
import {User} from '../../models/user/user';

export class UserAPI extends API {
    get getStatus() {return this.response.status}

    set Token(t) {this.response.data[0].token = t}
    set Pass(p) {this.password = p}

    constructor(res, id, username, email, updated) {
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
                    token: null
                }
            ]
        }
    }

    sign(password) {
        if (password) {
            return this.response.data[0].token = User.Token.gen(this.response.status, this.id, password);
        } else if (this.password) {
            return this.response.data[0].token = User.Token.gen(this.response.status, this.id, this.password);
        } else {
            return -1;
        }
    }

    endpoint() {
        this.res
            .status(200)
            .end(JSON.stringify(this.response, false, 4));
    }
}
