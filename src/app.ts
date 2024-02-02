import 'reflect-metadata';
import express, { Express } from 'express';
import { Server } from 'node:http';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExeptionFilter } from './errors/exception.filter';
import { PostContoller } from './posts/posts.contoller';
import { injectable, inject } from 'inversify';
import { Types } from './types';
import { json } from 'body-parser';
import { ConfigService } from './config/config.service';
import { PrismaService } from './common/db/prisma.service';

@injectable()
class App {
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(Types.LoggerService) private logger: LoggerService,
		@inject(Types.ExeptionFilter) private exeptionFilter: ExeptionFilter,
		@inject(Types.UsersController) private userController: UsersController,
		@inject(Types.PostController) private postController: PostContoller,
		@inject(Types.ConfigService) private configService: ConfigService,
		@inject(Types.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
		this.app.use('/', this.postController.router);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	getConfig(): void {
		console.log(this.configService)
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}

export default App;
