import dotenv from 'dotenv';

dotenv.config();

interface LoggerConfig {
  logLevel: string;
  timeStampFormat: string;
  fileNameFormat: string;
  fileDateFormat: string;
  logStoragePath: string;
}

const loggerConfig: LoggerConfig = {
  logLevel: process.env.LOG_LEVEL || 'info',
  timeStampFormat: 'YYYY-MM-DD hh:mm:ss.SSS',
  fileNameFormat: '%DATE%.log',
  fileDateFormat: 'YYYY-MM-DD',
  logStoragePath: process.env.LOG_STORAGE_PATH || 'src/storage/logs',
};

export default loggerConfig;
