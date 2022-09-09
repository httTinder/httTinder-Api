import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import { AppError } from "../errors/AppError";

export const verifySchemasMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const validationData = await schema.validate(data);
    if (!validationData) {
      throw new AppError(400, "invalid Field");
    }
    req.body = validationData;
    next();
  };
