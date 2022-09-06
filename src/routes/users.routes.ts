import { Router } from "express";
import { userListController } from "../controllers/user/userList.controller";
import { verifyAuthMiddleware } from "../middlewares/auth.middleware";
import { verifyAdminMiddleware } from "../middlewares/verifyAdmin.middleware";
import { userEditController } from "../controllers/user/userEdit.controller";
import activateUserController from '../controllers/user/active_user.controller'
import createUserController from '../controllers/user/create_user.controller'
import authEmailMiddleware from '../middlewares/authEmail.middleware'
import { verifyActiveMiddleware } from '../middlewares/verifyActive.middleware'

const usersRoutes = Router()

usersRoutes.get(
  "/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  userListController
);

usersRoutes.patch(
  "/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  userEditController
);

usersRoutes.post('', createUserController)

usersRoutes.patch(
	'/email/:id',
	authEmailMiddleware,
	verifyActiveMiddleware,
	activateUserController
)


export default usersRoutes
