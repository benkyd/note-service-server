require('regenerator-runtime/runtime');
require('babel-register')({
    presets: [ 'env' ]
});

function temporaryPrepare() {
    return arguments[1];
}
  
function globalStack() {
    const orig = Error.prepareStackTrace;
    Error.prepareStackTrace = temporaryPrepare;
    const err = new Error;
    Error.captureStackTrace(err, globalStack);
    const stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
}
  
Object.defineProperty(global, "__stack", {
    get: globalStack
});

Object.defineProperty(global, "__line", {
    get() {
        return __stack[1].getLineNumber();
    }
});

Object.defineProperty(global, "__function", {
    get() {
        return __stack[1].getFunctionName();
    }
});

module.exports = require('./src/index');
