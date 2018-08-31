import {BaseAPI} from './baseAPI';

export class API extends BaseAPI {
    constructor() {
        super();
    }
}

API.errors = require('./APIErrors').APIErrors;
API.user = require('./userResponses').User;
