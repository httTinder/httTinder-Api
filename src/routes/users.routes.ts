import { Router } from 'express'
import createUserController from '../controllers/user/create_user.controller'

const usersRoutes = Router()

usersRoutes.post('', createUserController)
usersRoutes.get('')

export default usersRoutes
