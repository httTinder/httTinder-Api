import { Router } from 'express'
import listUsersController from '../controllers/list_user.controller'
import { adminPermission } from '../middlewares/adminPermission.middleware'

const usersRoutes = Router()

usersRoutes.get('', adminPermission, listUsersController)

export default usersRoutes
