import { instanceToPlain } from 'class-transformer'
import { Request, response } from 'express'
import createUserService from '../../services/user/create_user.service'

const createUserController = async (req: Request, res: Response) => {
	const { age, email, name, password } = req.body
	const createNewUser = await createUserService({
		age,
		email,
		name,
		password,
	})
	return response.status(201).json({
		message: 'User Created',
		user: instanceToPlain(createNewUser),
	})
}

export default createUserController
