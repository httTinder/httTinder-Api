import { AppError } from "./../errors/AppError";
import { Response, Request, NextFunction } from "express";

export const uuidBodyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const regexExp =
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  const { uuid } = req.body;

  if (!regexExp.test(uuid) && uuid !== undefined) {
    throw new AppError(422, "Invalid uuid");
  }

  next();
};
