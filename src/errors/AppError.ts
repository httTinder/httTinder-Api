export class AppError extends Error {
	statusCode

	constructor(statusCode: number = 400, message: string) {
		super()
		this.statusCode = statusCode
		this.message = message
	}
}
