import {BaseAPI} from './baseAPI';

export class API extends BaseAPI {
    constructor() {
        super();
    }
}

API.errors = require('./APIErrors').APIErrors;
API.user = require('./userResponses').UserAPI;
API.permalink = require('./permaLinkResponse').PermaLinkAPI;
API.note = require('./noteResponse').NoteAPI;
