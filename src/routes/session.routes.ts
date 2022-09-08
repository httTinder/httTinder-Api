import { Router } from 'express'
import { userSessionController } from '../controllers/userSession/userSession.controller'
import { resendEmailMiddleware } from '../middlewares/user/user_email/resendEmail.middleware'

const sessionRoutes = Router()

sessionRoutes.post('', resendEmailMiddleware, userSessionController)

export default sessionRoutes
