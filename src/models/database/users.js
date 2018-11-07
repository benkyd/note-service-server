import Sequelize from 'sequelize';

import {BaseDatabase} from './baseDatabase';
import {Logger} from '../logger';

export class UserTools extends BaseDatabase {
    static async listAll() {
        const User = super.User;
        return User.findAll();
    }
 
    static async newUser(id, username, password, email, ip, authcode) {
        const User = super.User;
        
        try {
            let user = await User.create({
                id: id,
                username: username,
                password: password,
                email: email,
                ip: ip,
                lastupdated: new Date().getTime().toString(),
                verified: false,
                authcode: authcode,
                timeauthed: '-1'
            });
            return user;
        } catch (e) {
            Logger.error(`An error occured while inserting user ${username}, id ${id} into users table: ${JSON.stringify(e.errors)}`);
            return -1;
        }
    }

    static async deleteUser(id) {
        const User = super.User;

        try {
            await User.destroy({where: {id: id}});
            return 1;
        } catch (e) {
            Logger.error(`An error occured while deleting user id ${id}: ${e}`);
            return -1;
        }
    }

    static async getUserByID(id) {
        const User = super.User;
        
        try {
            let user = await User.findOne({where: {id: id}});
            if (user == null) return -1;
            return user;
        } catch (e) {
            Logger.error(`An error occured while querying for user id ${id}: ${e}`);
            return -1;
        }
    }

    static async getUser(column, search) {
        const User = super.User;

        try {
            let user;
            if (column == 'id') {
                return search;
            } else if (column == 'username') {
                user = await User.findOne({where: {username: search}});
                if (user == null) return -1;
            } else if (column == 'email') {
                user = await User.findOne({where: {email: search}});
                if (user == null) return -1;
            } else if (column == 'password') {
                user = await User.findOne({where: {password: search}});
                if (user == null) return -1;
            } else if (column == 'ip') {
                user = await User.findOne({where: {ip: search}});
                if (user == null) return -1;
            } else if (column == 'authcode') {
                user = await User.findOne({where: {authcode: search}});
                if (user == null) return -1;
            } else {
                return -1
            }
            return user;

        } catch (e) {
            Logger.error(`An error occured while querying the id of a user where ${column} is ${search}: ${e}`);
            return -1;
        }
    }

    static async updateIP(id, newIP) {
        const User = super.User;

        try {
            await User.update({ip: newIP}, {where: {id: id}});
            return 1;
        } catch (e) {
            Logger.error(`An error occured while updating user id ${id}'s ip: ${e}`);
            return -1;
        }
    } 

    static async authUser(id) {
        const User = super.User;

        try {
            let user = await User.update({verified: true}, {where: {id: id}});
            return 1;
        } catch (e) {
            Logger.error(`An error occured while authorizing user id ${id}'s ip: ${e}`);
            return -1;
        }
    }
}
