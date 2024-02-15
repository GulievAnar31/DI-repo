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
import { sign } from 'jsonwebtoken'; // подписывает токен
import { ConfigService } from '../config/config.service';

@injectable()
export class UsersController extends BaseController implements IUserController {
	userRouter: IControllerRoute[];

	constructor(
		@inject(Types.LoggerService) private loggerService: ILogger,
		@inject(Types.UserService) private userService: UserService,
		@inject(Types.ConfigService) private configService: ConfigService
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

			const jwt = await this.signJWT(body.email, this.configService.getKey('SECRET'))

			res.status(200).json({ message: 'Вход выполнен успешно', jwt: jwt });
		} catch (error) {
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

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign({
				email,
				iat: Math.floor(Date.now() / 1000) // когда мы выпустили токен что бы предотвратить утечку токена
			}, secret, {
				// алгоритм создания токена
				algorithm: 'HS256',

			}, (err, token) => {
				// обработка ошибки
				if (err) {
					reject(err);
				}

				resolve(token as string);
			})
			// nо из чего состоит подпись
		})
	}
}
