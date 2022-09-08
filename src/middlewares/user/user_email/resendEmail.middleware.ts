import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import sendEmail from '../../../utils/nodemailer.util'

export const resendEmailMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { isActive, id, email } = req.user

	if (isActive) {
		next()
	}

	const token = jwt.sign(
		{
			isActive: isActive,
			email: email,
		},
		process.env.SECRET_KEY as string,
		{
			subject: id,
			expiresIn: '24h',
		}
	)

	sendEmail({ to: email, subject: 'Confirm your email', text: token })

	next()
}
