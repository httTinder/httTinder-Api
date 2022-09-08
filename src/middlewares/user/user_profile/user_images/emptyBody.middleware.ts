import { Response, Request, NextFunction } from "express";
import { AppError } from "../../../../errors/AppError";

export const imageHeadersMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!JSON.stringify(req.headers).includes("multipart/form-data")) {
    throw new AppError(400, "Multipart headers missing")
  }
  next()
};
