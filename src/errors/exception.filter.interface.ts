import { Request, Response } from 'express';

export interface IExeptionFilter {
	catch: (err: Error, req: Request, res: Response) => void;
}
