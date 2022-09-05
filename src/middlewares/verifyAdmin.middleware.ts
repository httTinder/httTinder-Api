import AppDataSource from "../data-source";
import { Response, Request, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const verifyAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { isAdmin } = req.user;

  // if (!isAdmin) {
  //   throw new AppError(403, "user is not administrator");
  // }
  // next();
};
