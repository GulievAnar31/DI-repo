import { Request, Response, NextFunction } from 'express';

export interface IUserController {
	loginUser(req: Request, res: Response, next: NextFunction): void;
	registerUser(req: Request, res: Response): void;
}
