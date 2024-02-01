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

@injectable()
export class UsersController extends BaseController implements IUserController {
	userRouter: IControllerRoute[];

	constructor(@inject(Types.LoggerService) private loggerService: ILogger) {
		super(loggerService);
		this.userRouter = [
			{ method: 'post', path: '/login', func: this.loginUser },
			{ method: 'post', path: '/register', func: this.registerUser },
		];
		this.bindRoutes(this.userRouter);
	}

	loginUser(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		res.send('Login')
	}

	async registerUser({ body }: Request<{}, {}, UserRegisterDto>, res: Response): Promise<void> {
		const newUser = new User(body.email, body.name)
		await newUser.setPassword(body.password);
		res.send(newUser);
	}
}
