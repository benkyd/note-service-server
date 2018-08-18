const colours = require('colors/safe');

export class Logger {
    static info(message) {
        if (!message) throw 'No message defined';
        let d = new Date();
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.green('INFO') + '] ' + message);
    }

    static warn(message) {
        if (!message) throw 'No message defined';
        let d = new Date();
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.yellow('WARN') + '] ' + message);
    }

    static error(message) {
        if (!message) throw 'No message defined';
        let d = new Date();
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.red('ERROR') + '] ' + message);
    }

    static panic(message) {
        if (!message) throw 'No message defined';
        let d = new Date();
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.red('PANIC') + '] ' + message);
        process.exit();
    }
}

