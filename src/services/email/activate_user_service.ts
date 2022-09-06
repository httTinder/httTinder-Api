import AppDataSource from '../../data-source'
import { user } from '../../entities'
import { AppError } from '../../errors/AppError'

const activateUserService = async (isActive: boolean, id: string) => {
	if (isActive === true) {
		throw new AppError(400, 'This user is already active!')
	}

	const userRepository = AppDataSource.getRepository(user)

	const findUser = await userRepository.findOneBy({ id })

	if (!findUser) {
		throw new AppError(404, 'User not found')
	}

	userRepository.update(findUser!.id, { isActive: true })\
     
	return true
}

export default activateUserService
