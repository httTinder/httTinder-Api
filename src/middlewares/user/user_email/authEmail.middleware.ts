import 'dotenv/config'
import jwt from 'jsonwebtoken'

import { NextFunction, Request, Response } from 'express'
import { AppError } from '../../../errors/AppError'

const authEmailMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { tokenEmail } = req.params

	if (!tokenEmail) {
		throw new AppError(401, 'Invalid token')
	}

	jwt.verify(
		tokenEmail as string,
		process.env.SECRET_KEY as string,
		(error: any, decoded: any) => {
			if (error) {
				throw new AppError(401, 'Invalid Token')
			}
			req.user = {
				email: decoded.email,
				isActive: decoded.isActive,
				isAdm: decoded.isAdm,
				id: decoded.sub,
			}

			next()
		}
	)
}

export default authEmailMiddleware
