import AppDataSource from '../../data-source'
import { user } from '../../entities'
import { AppError } from '../../errors/AppError'

const activateUserService = async (id: string) => {
	const userRepository = AppDataSource.getRepository(user)

	const findUser = await userRepository.findOneBy({ id })

	if (!findUser) {
		throw new AppError(404, 'User not found')
	}

	userRepository.update(findUser!.id, { isActive: true })

	return true
}

export default activateUserService
