import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const adminPermission = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { isAdmin, id } = req.user;

    const userId = req.params.id
  
    if (id !== userId && !isAdmin) {
      throw new AppError(403, "missing authorization permissions");
    }
  
    next();
  };