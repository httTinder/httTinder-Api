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
import listUsersController from "../controllers/user/list_user.controller";
import { editUserMiddleWare } from "../middlewares/editUser.middleware";
import { upload } from "../utils/cloudinary.utils";
import { imageEditController } from "../controllers/user/imageEdit.controller";

const usersRoutes = Router()

usersRoutes.get("/all", verifyAuthMiddleware, verifyAdminMiddleware, listUsersController)

usersRoutes.get(
  "/data/:id?",
  verifyAuthMiddleware,
  adminPermission,
  userListController
);

usersRoutes.delete(
  "/data/:id?",
  verifyAuthMiddleware,
  adminPermission,
  verifyActiveMiddleware,
  userDeleteController
);

usersRoutes.patch(
  "/data/:id?",
  verifyAuthMiddleware,
  adminPermission,
  editUserMiddleWare,
  userEditController
);

usersRoutes.post('', createUserController)

usersRoutes.patch(
	'/email/:tokenEmail',
	activateUserController
)

usersRoutes.patch("/address/:id")

usersRoutes.patch("/profile/:id")

usersRoutes.patch("/lookingfor/:id")

usersRoutes.patch("/relationship/:id")

usersRoutes.patch("/images", verifyAuthMiddleware, upload.array("image", Infinity), imageEditController) // falta o delete

usersRoutes.patch("/additional/:id")

usersRoutes.patch("/hobbies/:id")

usersRoutes.patch("/pets/:id")

usersRoutes.patch("/languages/:id")

usersRoutes.patch("/music/:id")

usersRoutes.delete("/address/:id")

usersRoutes.delete("/profile/:id")

usersRoutes.delete("/lookingfor/:id")

usersRoutes.delete("/relationship/:id")

usersRoutes.delete("/images") // falta o delete

usersRoutes.delete("/additional/:id")

usersRoutes.delete("/hobbies/:id")

usersRoutes.delete("/pets/:id")

usersRoutes.delete("/languages/:id")

usersRoutes.delete("/music/:id")

export default usersRoutes
