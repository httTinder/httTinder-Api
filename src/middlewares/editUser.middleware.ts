import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const editUserMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.password !== undefined) {
    throw new AppError(422, "Password cannot be changed on this route");
  }

  if (req.body.email !== undefined) {
    throw new AppError(422, "Email cannot be changed on this route");
  }

  next();
};
