import {API} from './API';

export class NoteAPI extends API {
    constructor(res, user, id, content, order, parentgroup) {
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
                        uid: id,
                        text: content,
                        order: order,
                        parentgroup: parentgroup,
                        createdby: user.username,
                        id: user.id
                    }
                }
            ]
        }
    }
    
    endpoint() {
        this.res
            .status(201)
            .send(JSON.stringify(this.response, false, 4));
    }
}
