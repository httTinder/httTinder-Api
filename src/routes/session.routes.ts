import { Router } from 'express'
import { userSessionController } from '../controllers/userSession/userSession.controller'

const sessionRoutes = Router()

sessionRoutes.post('', userSessionController)

export default sessionRoutes
