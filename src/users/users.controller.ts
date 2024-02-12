import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { IControllerRoute } from '../common/routes.interface';
import { injectable, inject } from 'inversify';
import { Types } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUserController } from './user.contoller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserService } from './user.service';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UsersController extends BaseController implements IUserController {
	userRouter: IControllerRoute[];

	constructor(
		@inject(Types.LoggerService) private loggerService: ILogger,
		@inject(Types.UserService) private userService: UserService
	) {
		super(loggerService);
		this.userRouter = [
			{ 
				method: 'post',
				path: '/login',
				func: this.loginUser,
				middlewares: [new ValidateMiddleware(UserLoginDto)]
			},
			{ 
				method: 'post',
				path: '/register',
				func: this.registerUser,
				middlewares: [new ValidateMiddleware(UserRegisterDto)]
			},
		];
		this.bindRoutes(this.userRouter);
	}

	async loginUser({ body }: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.userService.validateUser(body);

			if (!result) {
				res.status(422).json({ error: 'Неверные учетные данные' });
				return;
			}

			res.status(200).json({ message: 'Вход выполнен успешно' });
		} catch(error){
			next(error);
		}
	}

	async registerUser({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.userService.createUser(body);
	
			if (!result) {
				res.status(422).json({ error: 'Такой пользователь уже существует' });
				return;
			}
	
			this.ok(res, { email: result.email, id: result.id });
		} catch (error) {
			next(error);
		}
	}	
}
