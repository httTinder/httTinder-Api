import AppDataSource from "../../../data-source";
import { user } from "../../../entities";
import { userAditionalData } from "../../../entities/user_aditional_data";
import { AppError } from "../../../errors/AppError";

export const deleteUserAddDataService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(user);
  const addDataRepository = AppDataSource.getTreeRepository(userAditionalData);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "user not found");
  }

  await addDataRepository.delete({ id: findUser.userAditionalData.id });

  return true;
};
