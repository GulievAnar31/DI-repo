import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { IControllerRoute } from '../common/routes.interface';
import { HTTPError } from '../errors/http-error.class';
import { injectable, inject, id } from 'inversify';
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

	loginUser(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		
	}

	async registerUser({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.userService.createUser(body);
	
			if (!result) {
				// this.logger.error('User already exists');
				res.status(422).json({ error: 'Такой пользователь уже существует' });
				return;
			}
	
			this.ok(res, { email: result.email, id: result.id });
		} catch (error) {
			// Handle other errors
			next(error);
		}
	}	
}
