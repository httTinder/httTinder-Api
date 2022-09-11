import 'dotenv/config'

import { createTransport } from 'nodemailer'
import { AppError } from '../errors/AppError'
import { IEmailRequest } from '../interfaces/email'

const sendEmail = async ({ to, subject, text, html }: IEmailRequest) => {
	const transporter = createTransport({
		host: 'smtp-mail.outlook.com',
		port: 587,
		secure: false,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PWD,
		},
	})

	await transporter
		.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject,
			html: html || text,
		})
		.then(() => {
			console.log('email send with sucess')
		})
		.catch((error) => {
			throw new AppError(403, `An error has occurred ${error}`)
		})
}

export default sendEmail
