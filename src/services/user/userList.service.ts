import AppDataSource from "../../data-source";
import { user } from "../../entities/index";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

const userListService = async (req: Request) => {
  let id = req.user.id;

  if (req.params.id !== undefined) {
    id = req.params.id;
  }

  const userRepository = AppDataSource.getRepository(user);

  const userFind = await userRepository.findOne({ where: { id } });

  if (!userFind) {
    throw new AppError(404, "User not found");
  }
  if (!req.user.isAdm) {
    return {
      name: userFind.name,
      email: userFind.email,
      age: userFind.age,
      createdAt: userFind.createdAt,
      updatedAt: userFind.updatedAt,
      address: userFind.address,
      profile: userFind.profile,
      userAditionalData: userFind.userAditionalData
    }
  }

  return userFind;
};

export default userListService;
