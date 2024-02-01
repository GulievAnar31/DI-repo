import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { IControllerRoute } from '../common/routes.interface';
import { HTTPError } from '../errors/http-error.class';
import { injectable, inject } from 'inversify';
import { Types } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUserController } from './user.contoller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@injectable()
export class UsersController extends BaseController implements IUserController {
	userRouter: IControllerRoute[];

	constructor(
		@inject(Types.LoggerService) private loggerService: ILogger,
		@inject(Types.UserService) private userService: UserService
	) {
		super(loggerService);
		this.userRouter = [
			{ method: 'post', path: '/login', func: this.loginUser, middlewares: [] },
			{ method: 'post', path: '/register', func: this.registerUser },
		];
		this.bindRoutes(this.userRouter);
	}

	loginUser(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		res.send('Login')
	}

	async registerUser({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const result = this.userService.createUser(body);
		if(!result){
			return next(new HTTPError(422, 'Такой пользователь уже существует'))
		}
		this.ok(res, 'Created')
	}
}