import { Router } from "express";
import { userSessionController } from "../controllers/userSession/userSession.controller";

export const sessionRoutes = Router();

sessionRoutes.post("", userSessionController);
