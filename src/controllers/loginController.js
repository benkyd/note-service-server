import {ControllerHandler} from './controllerHandler';
import {API} from './api/api';
import {Database} from '../models/database/database'
import {User} from '../models/user/user';

export class LoginController extends ControllerHandler {
    static async authenticate(req, res, next) {
        const errors = new API.errors(res);

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
            user = await Database.Users.getUser('email', email);
            if (user == -1) errors.addError(422, 'Unprocessable entity', 'There is no user with that email');
            username = user.username;
        } else {
            user = await Database.Users.getUser('username', username);
            if (user == -1) errors.addError(422, 'Unprocessable entity', 'There is no user with that username');
            email = user.email;
        }

        if (errors.count() > 0) {
            errors.endpoint();
            next();
            return;
        }

        const match = await User.Password.compare(password, user.password);
        if (!match) {
            errors.addError(401, 'Unauthorized', 'Incorrect password for user');
            errors.endpoint();
            next();
            return;
        }

        const response = new API.user(res, user.id, username, email, new Date(parseInt(user.lastupdated)).toLocaleString());
        let token = await Database.Authorization.getTokenByID(user.id);
        
        if (token == -1) {
            const encryptedPass = await User.Password.gen(password);
            password = null; // Cleaning password from memory
            const status = response.getStatus;
            token = User.Token.gen(status, user.id, encryptedPass);
            Database.Authorization.newToken(user.id, token, encryptedPass);
        } 
        response.Token = token.token;
        
        response.endpoint();
        next();
    }
}
