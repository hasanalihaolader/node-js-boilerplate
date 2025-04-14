import LogService from '@/service/logService';
import LogStatusEnum from '../enums/logStatus.enum';
const logService = new LogService();

type ExtraData = Record<string, any>;
type DataArray = any[];

const logger = {
  initializeLogServiceWithLevel: (
    level: LogStatusEnum,
    error_from: string = '',
    error_code: number | string,
    message: string = '',
    data: DataArray = [],
    extra?: ExtraData
  ): void => {
    logService.initialize(error_from, error_code, message, data, extra, level);
    logService.log();
  },

  info: (
    error_from: string = '',
    error_code: number | string,
    message: string = '',
    data: DataArray = [],
    extra?: ExtraData
  ): void => {
    logger.initializeLogServiceWithLevel(LogStatusEnum.INFO, error_from, error_code, message, data, extra);
  },

  warn: (
    error_from: string = '',
    error_code: number | string,
    message: string = '',
    data: DataArray = [],
    extra?: ExtraData
  ): void => {
    logger.initializeLogServiceWithLevel(LogStatusEnum.WARN, error_from, error_code, message, data, extra);
  },

  error: (
    error_from: string = '',
    error_code: number | string,
    message: string = '',
    data: DataArray = [],
    extra?: ExtraData
  ): void => {
    logger.initializeLogServiceWithLevel(LogStatusEnum.ERROR, error_from, error_code, message, data, extra);
  },

  debug: (
    error_from: string = '',
    error_code: number | string,
    message: string = '',
    data: DataArray = [],
    extra?: ExtraData
  ): void => {
    logger.initializeLogServiceWithLevel(LogStatusEnum.DEBUG, error_from, error_code, message, data, extra);
  }
};

export default logger;
