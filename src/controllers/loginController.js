import {ControllerHandler} from './controllerHandler';
import {API} from '../models/api/api';
import {Database} from '../models/database/database'
import {User} from '../models/user/user';

export class LoginController extends ControllerHandler {
    static async authenticate(req, res, next) {
        let errors = new API.errors(res);

        let ip = req.connection.remoteAddress;
        if (ip.startsWith('::ffff:')) ip = ip.substring(7);

        let username = req.body.username || undefined;
        let email = req.body.email || undefined;
        let password = req.body.password || undefined;

        if (!password) errors.addError(400, 'Bad request', 'A password is required');
        if (!username && !email) errors.addError(400, 'Bad request', 'A username or email is required');

        if (errors.count() > 0) {
            errors.endpoint();
            next();
            return;
        }

        let user;
        if (!username /*If they're loging in with email*/) {
            user = await Database.users.getUser('email', email);
            if (user == -1) errors.addError(422, 'Unprocessable entity', 'There is no user with that email');
            username = user.username;
        } else {
            user = await Database.users.getUser('username', username);
            if (user == -1) errors.addError(422, 'Unprocessable entity', 'There is no user with that username');
            email = user.email;
        }

        if (errors.count() > 0) {
            errors.endpoint();
            next();
            return;
        }

        let match = await User.Password.compare(password, user.password);

        if (!match) {
            errors.addError(401, 'Unauthorized', 'Incorrect password for user').endpoint();
            next();
            return;
        }

        let response = new API.user(res, user.id, username, email, new Date(parseInt(user.lastupdated)).toLocaleString());
        let token = await Database.auth.getTokenByID(user.id);
        
        if (token == -1) {
            let encryptedPass = await User.Password.gen(password);
            password = null; // Cleaning password from memory
            let status = response.getStatus;
            token = User.Token.gen(status, user.id, encryptedPass);
            Database.auth.newToken(user.id, token, encryptedPass);
        } 
        response.Token = token.token;
        
        response.endpoint();
        next();
    }
}
