import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const adminPermission = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAdm, id } = req.user;

  const userId = req.params.id;

  if (id !== userId && !isAdm) {
    throw new AppError(403, "missing authorization permissions");
  }

  next();
};
