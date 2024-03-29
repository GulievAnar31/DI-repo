import { Container, ContainerModule, interfaces } from 'inversify';
import App from './app';
import { ExeptionFilter } from './errors/exception.filter';
import { LoggerService } from './logger/logger.service';
import { PostContoller } from './posts/posts.contoller';
import { UserController } from './users/users.controller';
import { Types } from './types';
import { UserService } from './users/user.service';
import { IUserService } from './users/users.service.interface';
import { IConfifService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './common/db/prisma.service';
import { IUserRepository } from './users/user.repisitory.interface';
import { UsersRepository } from './users/users.repisitory';

export interface IBootstrap {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<LoggerService>(Types.LoggerService).to(LoggerService);
	bind<ExeptionFilter>(Types.ExeptionFilter).to(ExeptionFilter);
	bind<UserController>(Types.UsersController).to(UserController);
	bind<PostContoller>(Types.PostController).to(PostContoller);
	bind<IUserService>(Types.UserService).to(UserService);
	bind<PrismaService>(Types.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfifService>(Types.ConfigService).to(ConfigService).inSingletonScope();
	bind<IUserRepository>(Types.UsersRepository).to(UsersRepository).inSingletonScope();
	bind<App>(Types.Application).to(App);
});

function bootstrap(): IBootstrap {
	const appContainer = new Container();

	appContainer.load(appBindings);

	const app = appContainer.get<App>(Types.Application);

	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
