import { Response } from 'express'
import { Request } from 'express-serve-static-core'
import activateUserService from '../../services/email/activate_user_service'

const activateUserController = async (req: Request, res: Response) => {
	const { id } = req.user
	await activateUserService(id)
	return res.json({ message: 'Your email has been successfully confirmed' })
}
export default activateUserController
