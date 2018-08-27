const colours = require('colors/safe');

let LogLevel = 1;
export class Logger {
    static SetLevel(level) {
        LogLevel = level;
    }

    static get VERBOSE_LOGS() {return 0;}
    static get DEBUG_LOGS() {return 1;}
    static get INFO_LOGS() {return 2;}
    static get WARN_LOGS() {return 3;}

    static database(message) {
        if (LogLevel > 0) return; 
        let d = new Date();
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.magenta('SQLITE') + '] ' + message);
    }

    static middleware(message) {
        if (LogLevel > 0) return; 
        let d = new Date();
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.blue('HTTP-MIDDLEWARE') + '] ' + message);
    }

    static debug(message) {
        if (LogLevel > 1) return; 
        let d = new Date();
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.cyan('DEBUG') + '] ' + message);
    }

    static info(message) {
        if (LogLevel > 2) return; 
        let d = new Date();
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.green('INFO') + '] ' + message);
    }

    static warn(message) {
        if (LogLevel > 3) return; 
        let d = new Date();
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.yellow('WARN') + '] ' + message);
    }

    static error(message) {
        let d = new Date();
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.red('ERROR') + '] ' + message);
    }

    static panic(message) {
        let d = new Date();
        console.log('[' + d.toLocaleString() + '] [' 
            + colours.red('PANIC') + '] ' + message);
        process.exit();
    }
}

