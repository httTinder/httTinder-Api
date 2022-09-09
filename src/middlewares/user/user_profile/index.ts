import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../errors/AppError";

export const userProfileMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    orientation,
    gender,
    bio,
    height,
    education,
    profession,
    profileImage,
  } = req.body;

  if (
    orientation === undefined &&
    gender === undefined &&
    bio === undefined &&
    height === undefined &&
    education === undefined &&
    profession === undefined
  ) {
    throw new AppError(400, "Review required fields");
  }

  if (bio?.length > 280) {
    throw new AppError(400, "Education length is 280");
  }

  if (education?.length > 28) {
    throw new AppError(400, "Education length is 28");
  }

  if (profession?.length > 46) {
    throw new AppError(400, "Profession length is 46");
  }

  if (profileImage != undefined) {
    throw new AppError(400, "profile picture cannot be sent on this route");
  }
  next();
};
