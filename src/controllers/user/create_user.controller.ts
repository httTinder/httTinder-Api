import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

import { IUserRequest } from "../../interfaces/user";

import createUserService from "../../services/user/create_user.service";

const createUserController = async (req: Request, res: Response) => {
  const { age, email, name, password, isAdm }: IUserRequest = req.body;
  
  await createUserService({
    age,
    email,
    name,
    password,
    isAdm
  });
  
  return res
    .status(201)
    .json(instanceToPlain({ message: "user created successfully" }));
};

export default createUserController;
