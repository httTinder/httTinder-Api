import { Router } from 'express'
import createUserController from '../controllers/user/create_user.controller'

const usersRoutes = Router()

usersRoutes.get('')
usersRoutes.post('', createUserController)

export default usersRoutes
