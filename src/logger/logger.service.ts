import { injectable } from 'inversify';
import * as tslog from 'tslog';
import { ILogger } from './logger.interface';

@injectable()
export class LoggerService implements ILogger {
	public logger;

	constructor() {
		this.logger = new tslog.Logger();
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
