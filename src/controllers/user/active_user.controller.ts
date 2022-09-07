import { Response, Request } from 'express'
import activateUserService from '../../services/email/activate_user_service'

const activateUserController = async (req: Request, res: Response) => {
	const tokenEmail = req.params.tokenEmail

	await activateUserService(tokenEmail)
	
	return res.json({ message: 'Your email has been successfully confirmed' })
}
export default activateUserController
