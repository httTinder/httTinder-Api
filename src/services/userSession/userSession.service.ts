import { compareSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import AppDataSource from '../../data-source'
import { user } from '../../entities'
import { AppError } from '../../errors/AppError'
import { IUserSession } from '../../interfaces/user/userSession'

const userRepository = AppDataSource.getRepository(user)

export const userSessionService = async ({ email, password }: IUserSession) => {
	const findUser = await userRepository.findOne({
		where: {
			email,
		},
	})

	if (!findUser) {
		throw new AppError(403, 'Email or Password not match')
	}

	const verifyPassword = compareSync(password, findUser.password)

	if (!verifyPassword) {
		throw new AppError(403, 'Email or Password not match')
	}

	if (!findUser.isActive) {
		throw new AppError(403, 'User is not active')
	}

	const token = jwt.sign(
		{
			isAdm: findUser.isAdm,
			isActive: findUser.isActive,
			id: findUser.id,
		},
		process.env.SECRET_KEY as string,
		{ expiresIn: '24h', subject: findUser.id }
	)

	return token
}
