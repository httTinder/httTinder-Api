import { AppError } from '../errors/AppError'
import { NextFunction, Request, Response } from 'express'

export const verifyActiveMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	
	const { isActive } = req.user

	if (!isActive) {
		throw new AppError(401, 'user is not Active')
	}

	next()
}
