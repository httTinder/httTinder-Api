import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const adminPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAdm, id } = req.user;

  const userId = req.params.id;

  if (userId !== undefined && id !== userId && !isAdm) {
    throw new AppError(403, "missing authorization permissions");
  }

  next();
};
