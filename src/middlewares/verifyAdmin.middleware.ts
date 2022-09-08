import { Response, Request, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const verifyAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAdm } = req.user;

  if (!isAdm) {
    throw new AppError(403, "missing authorization permissions");
  }

  next();
};
