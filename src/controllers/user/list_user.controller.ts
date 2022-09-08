import { instanceToPlain } from 'class-transformer'
import { Request, Response } from 'express'
import listUserService from '../../services/user/list_users.service'

const listUsersController = async (req: Request, res: Response) => {
	const users = await listUserService()
	
	return res.json(instanceToPlain(users))
}

export default listUsersController
