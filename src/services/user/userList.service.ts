import AppDataSource from "../../data-source";
import { user } from "../../entities/index";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

const userListService = async (id: string) => {
  
  const userRepository = AppDataSource.getRepository(user);

  const userFind = await userRepository.findOne({ where: { id } });

  if (!userFind) {
    throw new AppError(404, "User not found");
  }
  if (!userFind.isAdm) {
    return {
      name: userFind.name,
      email: userFind.email,
      age: userFind.age,
      createdAt: userFind.createdAt,
      updatedAt: userFind.updatedAt,
      address: userFind.address,
      profile: userFind.profile,
      userAdditionalData: userFind.userAdditionalData
    }
  }

  return userFind;
};

export default userListService;
