import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/user";
import devCreateUserService from "../../services/user/devCreate.service";

const devCreateUserController = async (req: Request, res: Response) => {
  const { age, email, name, password, isAdm }: IUserRequest = req.body;

  await devCreateUserService({
    age,
    email,
    name,
    password,
    isAdm,
  });

  return res
    .status(201)
    .json(instanceToPlain({ message: "user created successfully" }));
};

export default devCreateUserController;
