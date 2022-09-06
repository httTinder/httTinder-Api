import { Router } from 'express'
import activateUserController from '../controllers/user/active_user.controller'
import createUserController from '../controllers/user/create_user.controller'
import authEmailMiddleware from '../middlewares/authEmail.middleware'
import { verifyActiveMiddleware } from '../middlewares/verifyActive.middleware'

const usersRoutes = Router()

usersRoutes.post('', createUserController)

usersRoutes.patch(
	'/email/:id',
	authEmailMiddleware,
	verifyActiveMiddleware,
	activateUserController
)

usersRoutes.get('')

export default usersRoutes
