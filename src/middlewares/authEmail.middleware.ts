import 'dotenv/config'
import jwt from 'jsonwebtoken'

import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/AppError'

const authEmailMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params
	let token = req.body

	if (!token) {
		throw new AppError(401, 'Invalid token')
	}

	token = token.split(' ')[1]

	if (!id) {
		throw new AppError(401, 'Invalid user')
	}

	jwt.verify(
		token,
		process.env.SECRET_KEY as string,
		(error: any, decoded: any) => {
			if (error) {
				throw new AppError(401, 'Invalid token')
			}

			req.user = {
				isAdmin: decoded.isAdm,
				isActive: decoded.isActive,
				id: decoded.sub,
			}

			if (id !== req.user.id) {
				throw new AppError(401, 'Invalid token')
			}

			next()
		}
	)
}

export default authEmailMiddleware
