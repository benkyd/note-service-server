import bcrypt from 'bcrypt';

import {Logger} from '../models/logger';
import {ControllerHandler} from './controllerHandler';
import {API} from './api/api';
import {Database} from '../models/database/database'
import {User} from '../models/user/user';

export class UserController extends ControllerHandler {
    static async newUser(req, res, next) {
        const errors = new API.errors(res);

        let ip = req.connection.remoteAddress;
        if (ip.startsWith('::ffff:')) ip = ip.substring(7);

        const username = req.body.username || undefined;
        const email = req.body.email || undefined;
        let password = req.body.password || undefined;

        if (!username || !email || !password) errors.addError(422, 'Unprocessaable entity', 'Missing username, email or password in body of request');

        if (!UserController.isUsernameValid(username)) errors.addError(422, 'Unprocessaable entity', 'Invalid username has special charicters (allowed A-z 0-9 - and _ without spaces)');
        if (!UserController.isEmailValid(email)) errors.addError(422, 'Unprocessaable entity', 'Invalid email');
        if (!UserController.isPasswordValid(password)) errors.addError(422, 'Unprocessaable entity', 'Invalid password has spaces');
        if (password.length < 7) errors.addError(422, 'Unprocessaable entity', 'Invalid password less than 7 charicters');

        if (await Database.Users.getUser('username', username) != -1) errors.addError(422, 'Unprocessable entity', 'A user with that username allready exists');
        if (await Database.Users.getUser('email', email) != -1) errors.addError(422, 'Unprocessable entity', 'A user with that email allready exists');

        if (errors.count() > 0) {
            errors.endpoint();
            next();
            return;
        }
        
        const response = new API.user(res, id, username, email, new Date().toLocaleString());

        const encryptedPass = await User.Password.gen(password);
        password = null; // Cleaning password from memory

        const status = response.getStatus;
        
        const id = new Date().getTime();
        const token = await User.Token.gen(status, id, encryptedPass);
        await Database.Authorization.newToken(id, token, encryptedPass);
        response.Token = token;

        const user = new User(id, username, encryptedPass, email, ip, 1234); // Authcode is placeholder for email authentication
        const success = await user.insert();
        if (success == -1) {
            errors.addError(500, 'Internal server error');
            errors.endpoint();
            next();
            return;
        }

        response.endpoint();
        next();
    }

    static isUsernameValid(username) {
        if (username.match(/[^A-Za-z0-9_-]/)) {
            return false;
        }
        return true;
    }
    
    static isEmailValid(email) {
        if (email.match(/[^A-Za-z0-9@.-_]/)) {
            return false;
        }
        return true;
    }
    
    static isPasswordValid(pass) {
        if (pass.match(/\s/)) {
            return false;
        }
        return true;
    }
}
