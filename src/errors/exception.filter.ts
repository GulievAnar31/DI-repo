import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { IExeptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error.class';
import { Types } from '../types';
import { LoggerService } from '../logger/logger.service';
import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(Types.LoggerService) private logger: LoggerService) {}

	catch(err: Error | HTTPError, req: Request, res: Response): void {
		if (err instanceof HTTPError) {
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`${err.message}`);
		}
	}
}
