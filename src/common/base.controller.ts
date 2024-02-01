import { Router, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IControllerRoute } from './routes.interface';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;
	logger: ILogger;

	constructor(logger: ILogger) {
		this._router = Router();
		this.logger = logger;
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): Response<any, Record<string, any>> {
		res.type('application/json');
		return res.sendStatus(code).json(message);
	}

	public ok<T>(res: Response, message: T): void {
		this.send<T>(res, 200, message);
	}

	public created(res: Response): Response<any> {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method} ${route.path}]`);
			const handler = route.func.bind(this);
			this._router[route.method](route.path, handler);
		}
	}
}
