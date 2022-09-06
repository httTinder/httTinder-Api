import AppDataSource from '../data-source'
import { user } from '../entities'

const listUserService = async (): Promise<user[]> => {
	const userRepository = AppDataSource.getRepository(user)

	const users = await userRepository.find()

	return users
}

export default listUserService
