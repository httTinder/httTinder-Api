import { response } from 'express'
import createUserService from '../../services/user/create_user.service'

const createUserController = async (req: Request, res: Response) => {
	const newUser = req.body
	const createNewUser = createUserService(newUser)
	return response.status(201).json({
		message: 'User Created',
		user: createNewUser,
	})
}

export default createUserController
