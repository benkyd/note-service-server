import Sequelize from 'sequelize';

import {BaseDatabase} from './baseDatabase';
import {Logger} from '../logger';
import {Config} from '../../config/config';

export class UserTools extends BaseDatabase {
    static async testing() {
        Logger.debug('Hello, world!');
    }
}
