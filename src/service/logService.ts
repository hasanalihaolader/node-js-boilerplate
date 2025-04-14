import winston, { Logger } from 'winston';
import 'winston-daily-rotate-file';
import LogStatusEnum from '../enums/logStatus.enum';
import loggerConfig from '../config/logger';

type LogLevel = keyof typeof LogStatusEnum;

class LogService {
    private error_from: string | null = null;
    private error_code: number | string | null = null;
    private message: string | null = null;
    private data: any = null;
    private extra: any[] = [];
    private level: LogStatusEnum = LogStatusEnum.INFO;

    initialize(
        error_from: string = '',
        error_code: number | string,
        message: string = '',
        data: any = [],
        extra: any = [],
        level: LogStatusEnum = LogStatusEnum.INFO
    ): void {
        this.error_from = error_from;
        this.error_code = error_code;
        this.message = message;
        this.data = data;
        this.extra = extra;
        this.level = level;
    }

    private logObject(): string {
        return JSON.stringify({
            code: this.error_code,
            level: this.level,
            error_from: this.error_from,
            message: this.message,
            context: this.data,
            extra: this.extra
        });
    }

    log(): void {
        this.console();
        this.file();
    }

    private console(): void {
        const logger: Logger = winston.createLogger({
            level: loggerConfig.logLevel,
            format: winston.format.combine(
                winston.format.timestamp({ format: loggerConfig.timeStampFormat }),
                winston.format.printf(() => this.logObject())
            ),
            transports: [new winston.transports.Console()]
        });

        this.write(logger);
    }

    private file(): void {
        const logger: Logger = winston.createLogger({
            level: 'info',
            transports: [
                new winston.transports.DailyRotateFile({
                    filename: loggerConfig.fileNameFormat,
                    dirname: loggerConfig.logStoragePath,
                    datePattern: loggerConfig.fileDateFormat
                })
            ],
            format: winston.format.combine(
                winston.format.timestamp({ format: loggerConfig.timeStampFormat }),
                winston.format.printf(() => this.logObject())
            )
        });

        this.write(logger);
    }

    private write(logger: Logger): void {
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
                break;
        }
    }
}

export default LogService;
