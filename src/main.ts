import { Container, ContainerModule, interfaces } from 'inversify';
import App from './app';
import { ExeptionFilter } from './errors/exception.filter';
import { LoggerService } from './logger/logger.service';
import { PostContoller } from './posts/posts.contoller';
import { UsersController } from './users/users.controller';
import { Types } from './types';
import { UserService } from './users/user.service';
import { IUserService } from './users/users.service.interface';

export interface IBootstrap {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<LoggerService>(Types.LoggerService).to(LoggerService);
	bind<ExeptionFilter>(Types.ExeptionFilter).to(ExeptionFilter);
	bind<UsersController>(Types.UsersController).to(UsersController);
	bind<PostContoller>(Types.PostController).to(PostContoller);
	bind<IUserService>(Types.UserService).to(UserService)
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
