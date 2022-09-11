import { verifySchemasMiddleware } from "./../middlewares/verifySchemas.middleware";
import { Router } from "express";
import { userSessionController } from "../controllers/userSession/userSession.controller";
import { sessionSchema } from "../schemas/session/session.schema";

const sessionRoutes = Router();

sessionRoutes.post(
  "",
  verifySchemasMiddleware(sessionSchema),
  userSessionController
);

export default sessionRoutes;
