import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";

export const activateUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenEmail = req.params.tokenEmail;

  const response = await jwt.verify(
    tokenEmail as string,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error.name === "TokenExpiredError") {
        throw new AppError(401, "Token expired");
      }
      
      if (error.name !== "TokenExpiredError") {
        throw new AppError(401, "Invalid Token");
      }
      
      req.user = {
        isActive: decoded.isActive,
        id: decoded.sub,
        isAdm: decoded.isAdm,
      };
      next()
    }
  );
};
