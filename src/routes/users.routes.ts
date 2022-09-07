import { Router } from "express";
import { userListController } from "../controllers/user/userList.controller";
import { verifyAuthMiddleware } from "../middlewares/auth.middleware";
import { verifyAdminMiddleware } from "../middlewares/verifyAdmin.middleware";
import { userEditController } from "../controllers/user/userEdit.controller";
import activateUserController from '../controllers/user/active_user.controller'
import createUserController from '../controllers/user/create_user.controller'
import authEmailMiddleware from '../middlewares/authEmail.middleware'
import { verifyActiveMiddleware } from '../middlewares/verifyActive.middleware'
import { adminPermission } from "../middlewares/adminPermission.middleware";
import userDeleteController from "../controllers/user/userDelete.controller";

const usersRoutes = Router()

usersRoutes.get(
  "/:id?",
  verifyAuthMiddleware,
  adminPermission,
  userListController
);

usersRoutes.delete(
  "/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  userDeleteController
);

usersRoutes.patch(
  "/:id?",
  verifyAuthMiddleware,
  adminPermission,
  userEditController
);

usersRoutes.post('', createUserController)

usersRoutes.patch(
	'/email/:tokenEmail',
	activateUserController
)

usersRoutes.patch("/user/address/:id")

usersRoutes.patch("/user/profile/:id")

usersRoutes.patch("/user/lookingfor/:id")

usersRoutes.patch("/user/relationship/:id")

usersRoutes.patch("/user/images/:id")

usersRoutes.patch("/user/additional/:id")

export default usersRoutes
