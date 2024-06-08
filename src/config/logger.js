require('dotenv').config();
module.exports = {
    logLevel: process.env.LOG_LEVEL || 'info',
    timeStampFormat: 'YYYY-MM-DD hh:mm:ss.SSS',
    fileNameFormat: '%DATE%.log',
    fileDateFormat: 'YYYY-MM-DD',
    logStoragePath: process.env.LOG_STORAGE_PATH || 'src/storage/logs',
}