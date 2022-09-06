import { Router } from 'express'
import activateUserController from '../controllers/user/active_user.controller'
import createUserController from '../controllers/user/create_user.controller'

const usersRoutes = Router()

usersRoutes.post('', createUserController)
usersRoutes.patch('/email', activateUserController)

usersRoutes.get('')

export default usersRoutes
