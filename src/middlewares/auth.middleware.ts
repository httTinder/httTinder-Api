import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const verifyAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError(401, "Token invalid");
  }

  token = token.split(" ")[1];

  jwt.verify(
    token as string,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        throw new AppError(401, "Invalid Token");
      }
      req.user = {
        isActive: decoded.isActive,
        id: decoded.id,
        isAdmin: decoded.isAdmin,
      };
      next();
    }
  );
};
