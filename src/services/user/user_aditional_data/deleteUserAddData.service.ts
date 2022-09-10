import AppDataSource from "../../../data-source";
import { user } from "../../../entities";
import { userAdditionalData } from "../../../entities/user_aditional_data";
import { AppError } from "../../../errors/AppError";

export const deleteUserAddDataService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(user);

  const addDataRepository = AppDataSource.getTreeRepository(userAdditionalData);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "user not found");
  }

  //const findAddData = addDataRepository.findOne({where : {id }})

  await addDataRepository.delete({ id: findUser.userAdditionalData.id });

  return true;
};
