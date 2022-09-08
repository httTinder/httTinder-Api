import { AppError } from "./../errors/AppError";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      code: error.statusCode,
      message: error.message,
    });
  }

  return res.status(500).json({
    status: "Error",
    code: 500,
    message: "Internal Server Error",
  });
};
