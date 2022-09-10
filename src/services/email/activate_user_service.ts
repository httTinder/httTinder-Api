import AppDataSource from "../../data-source";
import { user } from "../../entities";
import { AppError } from "../../errors/AppError";
import jwt from "jsonwebtoken";

const activateUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(user);

  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  if (findUser.isActive) {
    throw new AppError(400, "User already active");
  }

  userRepository.update(findUser!.id, { isActive: true });

  return true;
};

export default activateUserService;
