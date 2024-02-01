import { Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { IControllerRoute } from '../common/routes.interface';
import { Types } from '../types';
import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class PostContoller extends BaseController {
	postsRouter: IControllerRoute[];

	constructor(@inject(Types.LoggerService) private loggerService: ILogger) {
		super(loggerService);

		this.postsRouter = [{ method: 'get', path: '/posts', func: this.getPosts }];

		this.bindRoutes(this.postsRouter);
	}

	getPosts(req: Request, res: Response): void {
		console.log('aaaaa');
		res.send([
			{ id: '1', title: 'babazyana' },
			{ id: '2', title: 'gitler' },
			{ id: '3', title: 'ferari' },
			{ id: '4', title: 'chupachupa' },
		]);
	}
}
