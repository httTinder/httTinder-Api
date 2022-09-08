import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/AppError'

export const verifyActiveMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { isActive } = req.user

	if (isActive) {
		throw new AppError(401, 'User is not Active')
	}

	next()
}
