const winston = require('winston');
const LogStatusEnum = require("../enums/logStatus.enum");
const loggerConfig = require('../config/logger');
require('winston-daily-rotate-file');

class LogService {
    error_from = null;
    error_code = null;
    message = null;
    data = null;
    extra = [];
    level = null;

    initialize = (error_from = '', error_code, message = '', data = [], extra, level = LogStatusEnum.INFO) => {
        this.error_from = error_from;
        this.error_code = error_code;
        this.message = message;
        this.data = data;
        this.extra = extra;
        this.level = level;
    }


    logObject = () => {
        return JSON.stringify({
            'code': this.error_code,
            'level': this.level,
            'error_from': this.error_from,
            'message': this.message,
            'context': this.data,
            'extra': this.extra
        })
    }

    log = () => {
        this.console();
        this.file();
    }


    console = () => {
        let logger = winston.createLogger({
            level: loggerConfig.logLevel,
            format: winston.format.combine(
                winston.format.timestamp({
                    format: loggerConfig.timeStampFormat,
                }),
                winston.format.printf(() => {
                    return this.logObject();
                })
            ),
            transports: [new winston.transports.Console()],
        });
        this.write(logger);
    }

    file = () => {
        let logger = winston.createLogger({
            level: 'info',
            transports: [
                new winston.transports.DailyRotateFile({
                    filename: loggerConfig.fileNameFormat,
                    dirname: loggerConfig.logStoragePath,
                    datePattern: loggerConfig.fileDateFormat,
                    prepend: true,
                })
            ],
            format: winston.format.combine(
                winston.format.timestamp({
                    format: loggerConfig.timeStampFormat
                }),
                winston.format.printf(() => {
                    return this.logObject();
                })
            )
        });
        this.write(logger);
    }

    write = (logger) => {
        switch (this.level) {
            case LogStatusEnum.WARN:
                logger.warn(this.logObject());
                break;
            case LogStatusEnum.ERROR:
                logger.error(this.logObject());
                break;
            case LogStatusEnum.DEBUG:
                logger.debug(this.logObject());
                break;
            case LogStatusEnum.INFO:
            default:
                logger.info(this.logObject());
        }

    }
}

module.exports = LogService