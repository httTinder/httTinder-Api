import { Router } from "express";
import { userListController } from "../controllers/user/userList.controller";
import { verifyAuthMiddleware } from "../middlewares/auth.middleware";
import { verifyAdminMiddleware } from "../middlewares/verifyAdmin.middleware";

const usersRoutes = Router();

usersRoutes.get(
  "/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  userListController
);

export default usersRoutes;
