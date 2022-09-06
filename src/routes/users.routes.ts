import { Router } from "express";
import { userListController } from "../controllers/user/userList.controller";
import { verifyAuthMiddleware } from "../middlewares/auth.middleware";
import { verifyAdminMiddleware } from "../middlewares/verifyAdmin.middleware";
import { userEditController } from "../controllers/user/userEdit.controller";

const usersRoutes = Router();

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

export default usersRoutes;
