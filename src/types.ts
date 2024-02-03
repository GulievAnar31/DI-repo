import { UsersRepository } from "./users/users.repisitory";

export const Types = {
	Application: Symbol.for('Application'),
	LoggerService: Symbol.for('LoggerService'),
	UsersController: Symbol.for('UserController'),
	PostController: Symbol.for('PostController'),
	UserService: Symbol.for('UserService'),
	ExeptionFilter: Symbol.for('ExeptionFilter'),
	ConfigService: Symbol.for('ConfigService'),
	PrismaService: Symbol.for('PrismaService'),
	UsersRepository: Symbol.for('UsersRepository'),
};
