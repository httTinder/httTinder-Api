import { Response, Request, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const verifyIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.idParams = { id: req.user.id };

  if (req.params.id !== undefined) {
    req.idParams = { id: req.params.id };
  }

  next();
};
