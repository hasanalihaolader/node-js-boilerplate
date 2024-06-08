const LogStatusEnum = require("../enums/logStatus.enum");
const LogService = require("../service/logService");

let logService = new LogService();
const logger = {
    initializeLogServiceWithLevel: (error_from = '', error_code, message = '', data = [], extra, level) => {
        logService.initialize(error_from, error_code, message, data, extra, level);
        logService.log();
    },
    info: (error_from = '', error_code, message = '', data = [], extra) => {
        logger.initializeLogServiceWithLevel(error_from, error_code, message, data, extra, LogStatusEnum.INFO);
    },

    warn: (error_from = '', error_code, message = '', data = [], extra) => {
        logger.initializeLogServiceWithLevel(error_from, error_code, message, data, extra, LogStatusEnum.WARN);
    },


    error: (error_from = '', error_code, message = '', data = [], extra) => {
        logger.initializeLogServiceWithLevel(error_from, error_code, message, data, extra, LogStatusEnum.ERROR);
    },

    debug: (error_from = '', error_code, message = '', data = [], extra) => {
        logger.initializeLogServiceWithLevel(error_from, error_code, message, data, extra, LogStatusEnum.DEBUG);
    }

};
module.exports = logger;