import { Response, Request, NextFunction } from "express";
import { AppError } from "../../../../errors/AppError";

export const uuidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const regexExp =
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  req.body.images.forEach((idParams: string) => {
    if (!regexExp.test(idParams)) {
      throw new AppError(422, "not UUID v4 template");
    }
  });
  next();
};
