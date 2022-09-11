import { Response, Request } from 'express'
import activateUserService from '../../services/email/activate_user_service'


const activateUserAdminController = async (req: Request, res: Response) => {
	const id = req.params.id

	await activateUserService(id)
	
	return res.json({ message: 'Your email has been successfully confirmed' })
}
export default activateUserAdminController
