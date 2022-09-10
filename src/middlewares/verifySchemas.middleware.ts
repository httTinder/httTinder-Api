import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import { AppError } from "../errors/AppError";

export const verifySchemasMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    try {
      const validationData = await schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (err) {
      throw new AppError(400, "invalid Field");
    }
  };
