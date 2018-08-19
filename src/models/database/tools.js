import {Database} from './database';
import {Logger} from '../logger';

export class DbTools extends Database {
    static async getRow(table, id) {
        let connection = Database.Connection;
        let res;
        
        let promise = new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM \`${table}\` WHERE \`${table}\`.\`id\` = '${id}';`, async(err, results, fields) => {
                if (err) {
                    Logger.warn(`Error querying ${table} with ${id}`);
                    return -1;
                    reject();
                }
                res = results;
                resolve();
            });
        });
        await promise;
        if (res[0]) {
            return res[0];
        } else {
            return -1;
        }
    }
    
    static async getID(table, column, term) {
        let connection = Database.Connection;
        let res;
        
        let promise = new Promise((resolve, reject) => {
            connection.query(`SELECT \`id\` FROM \`${table}\` WHERE \`${table}\`.\`${column}\` = '${term}';`, async(err, results, fields) => {
                if (err) {
                    Logger.warn(`Error querying ${table}'s ${column} with ${term}`);
                    return -1;
                    reject();
                }
                res = results;
                resolve();
            });
        });
        await promise;
    
        let id = 0;
        if (res[0]) {
            id = res[0].id;
        } else {
            id = 0;
        }
        return id;
    }
    
    static async createUser(id, username, password, email, phone, ip, token, lastupdated, admin, authcode) {
        let connection = Database.Connection;
    
        let promise = new Promise((resolve, reject) => {
            connection.query(`INSERT INTO \`Users\` (\`id\`, \`username\`, \`password\`, \`email\`, \`phone\`, \`ip\`, \`token\`, \`lastupdated\`, \`verified\`, \`authcode\`, \`timeauthed\`,\`admin\`) VALUES ('${id}', '${username}', '${password}', '${email}', '${phone}', '${ip}', '${token}', '${lastupdated}', '0', '${authcode}', 'UNAUTHORISED', '${admin}');` , async(err, results, fields) => {
                if (err) {
                    Logger.warn(`Error inserting user ${username}`);
                    return -1;
                    reject();
                }
                resolve();
            });
        });
        await promise;
    }
    
    static async deleteUser(id) {
        let connection = Database.Connection;
    
        let promise = new Promise((resolve, reject) => {
            connection.query(`DELETE FROM \`Users\` WHERE \`id\` = '${id}'`, async(err, results, fields) => {
                if(err) {
                    Logger.warn(`Error deleting User at ID ${id}`);
                    return -1;
                    reject();
                }
                resolve();
            });
        });
        await promise;
        return 1;
    }
    
    static async updateUserIP(id, ip) {
        let connection = Database.Connection;
    
        let promise = new Promise((resolve, reject) => {
            connection.query(`UPDATE \`Users\` SET \`ip\` = '${ip}' WHERE \`Users\`.\`id\` = '${id}'`, async(err, results, fields) => {
                if(err) {
                    Logger.warn(`Error updating User ip at ID ${id}`);
                    return -1;
                    reject();
                }
                resolve();
            });
        });
        await promise;
        return 1;
    }
    
    static async authUser(id, timeauthed) {
        let connection = Database.Connection;
    
        let promise = new Promise((resolve, reject) => {
            connection.query(`UPDATE \`Users\` SET \`verified\` = '1' WHERE \`Users\`.\`id\` = '${id}'`, async(err, results, fields) => {
                if(err) {
                    Logger.warn(`Error authorizing User at ID ${id}`);
                    return -1;
                    reject();
                }
                resolve();
            });
        });
        await promise;
    
        let promise1 = new Promise((resolve, reject) => {
            connection.query(`UPDATE \`Users\` SET \`timeauthed\` = '${timeauthed}' WHERE \`Users\`.\`id\` = '${id}'`, async(err, results, fields) => {
                if(err) {
                    Logger.warn(`Error authorizing User at ID ${id}`);
                    return -1;
                    reject();
                }
                resolve();
            });
        });
        await promise1;
    
        return 1;
    }
    
    static async exec(cmd) {
        let connection = Database.Connection;
        let res;
    
        let promise = new Promise((resolve, reject) => {
            connection.query(cmd, async(err, results, fields) => {
                if (err) {
                    Logger.warn(`Error executing ${cmd} on the database`);
                    return -1;
                    reject();
                }
                res = results;
                resolve();
            })
        });
        await promise;
        return res;
    }
}
