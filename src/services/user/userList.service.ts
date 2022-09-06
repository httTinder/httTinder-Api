import AppDataSource from "../../data-source";
import { user } from "../../entities/index";
import { AppError } from "../../errors/AppError";
const userListService = async (id: string): Promise<user> => {
  const userRepository = AppDataSource.getRepository(user);
  const userFind = await userRepository.findOne({ where: { id: id } });
  if (!userFind) {
    throw new AppError(404, "User not found");
  }
  return userFind;
};
export default userListService;
