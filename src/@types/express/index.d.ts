import * as express from 'express'

declare global {
	namespace Express {
		interface Request {
			user: {
				email: string
				isAdm: boolean
				isActive: boolean
				id: string
			}
			idParams: {
				id: string
			}
		}
	}
}
