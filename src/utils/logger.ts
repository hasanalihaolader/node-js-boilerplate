import LogService from "@/service/LogService";
import LogStatusEnum from "@/enums/LogStatus.enum";

class Logger {
	private logService: LogService;

	constructor() {
		this.logService = new LogService();
	}

	private initializeLogServiceWithLevel(
		level: LogStatusEnum,
		error_code: number | string,
		extra?: Record<string, any>,
		error_from = "",
		message = "",
		data: any[] = []
	): void {
		this.logService.initialize(error_code, error_from, message, data, extra, level);
		this.logService.log();
	}

	public info(
		error_code: number | string,
		extra?: Record<string, any>,
		error_from = "",
		message = "",
		data: any[] = []
	): void {
		this.initializeLogServiceWithLevel(
			LogStatusEnum.INFO,
			error_code,
			extra,
			error_from,
			message,
			data
		);
	}

	public warn(
		error_code: number | string,
		extra?: Record<string, any>,
		error_from = "",
		message = "",
		data: any[] = []
	): void {
		this.initializeLogServiceWithLevel(
			LogStatusEnum.WARN,
			error_code,
			extra,
			error_from,
			message,
			data
		);
	}

	public error(
		error_code: number | string,
		extra?: Record<string, any>,
		error_from = "",
		message = "",
		data: any[] = []
	): void {
		this.initializeLogServiceWithLevel(
			LogStatusEnum.ERROR,
			error_code,
			extra,
			error_from,
			message,
			data
		);
	}

	public debug(
		error_code: number | string,
		extra?: Record<string, any>,
		error_from = "",
		message = "",
		data: any[] = []
	): void {
		this.initializeLogServiceWithLevel(
			LogStatusEnum.DEBUG,
			error_code,
			extra,
			error_from,
			message,
			data
		);
	}
}

const logger = new Logger();
export default logger;
