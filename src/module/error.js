'use strict';

class LetureError extends Error{
    constructor (lastError) {
        super();
        if(lastError) {
            if(lastError instanceof Error || typeof lastError == 'object'){
                this.lastError = lastError;
            }else{
                this.desc = lastError;
            }
        }else{
            this.desc = '-';
        }
    }
}
exports.LetureError = LetureError;

class EtsErrorWithParams extends LetureError {
    constructor(descStr, ...args) {
        super();
        if(args.length > 0) {
            this.params = args;
            this.desc = `${descStr} - ${args.join(',')}`;
        }else{
            this.desc = `${descStr}`;
        }
    }
}

class EtsErrorWithoutLogging extends LetureError {
    constructor(...args) {
        super(...args);
    }
}
exports.LetureErrorWithoutLogging = EtsErrorWithoutLogging;

exports.ParameterError = class ParameterError extends LetureError {
    constructor (...args) {
        super(`Not input parameter`, ...args);
        this.code = 'NONE_PARAMETER';
    }
};

exports.LetureErrorWithoutLogging = class NotFoundError404 extends LetureError {
    constructor(lastError) {
        super(lastError);
    }
};

exports.DatabaseError = class DatabaseError extends LetureError {
    constructor(lastError) {
        super(lastError);
    }
};

exports.NotFoundError404 = class NotFoundError404 extends NotFoundError404 {
    constructor(lastError) {
        super(lastError);
    }
}

