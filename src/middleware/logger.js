"use strict";

const winston = require( 'winston' );// Or read from a configuration
const processName = process.env.NODE_NAME || "Leture-Server";
const env  = process.env.NODE_ENV || "development";


let myConsoleFormat = winston.format.printf(({level, message, timestamp, ...rest}) => {
    try {
        let jsonResult = JSON.stringify(rest);
        let resultString = (jsonResult.length > 1000) ? jsonResult.slice(0,1000) + '...' : jsonResult;
        return `[${level}] ${timestamp} : ${message} - ${resultString}`
    }
    catch(e) {
        console.log(e);
    }
});


class Logger {
    constructor () {
        this.actionLogger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    level: 'info', // Only write logs of warn level or higher
                    format: winston.format.combine(
                        winston.format.colorize({all: true}), //색바꿔주는거
                        winston.format.timestamp(), //시간 찍어주는거
                        myConsoleFormat //메세지 form
                    )
                }),
            ]
        });

        this.errorLogger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    level: 'warn', // Only write logs of warn level or higher
                    format: winston.format.combine(
                        winston.format.colorize({all: true}),
                        winston.format.timestamp(),
                        myConsoleFormat
                    )
                }),
            ]
        });
    }
    errorConsole(err){
        try {
            const errorName = (err instanceof Error) ? err.constructor.name:
                err['errorName'] ? err['errorName'] : 'UnknownError';
            this.errorLogger.error(errorName, err);
        }catch (e) {
            this.errorLogger.error(e.constructor.name, e);
        }
    }
    infoConsole(msg,options) {
        try {
            let data = options;
            // if(options instanceof model.Sequelize.Model) {
            //     data = options['dataValues'];
            // }
            this.actionLogger.info(msg, data);
        }
        catch (e) {
            this.errorLogger.error(e.constructor.name, e);
        }
    };
}

const logger = new Logger();
module.exports = logger;