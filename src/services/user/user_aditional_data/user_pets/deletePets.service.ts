import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userPets } from "../../../../entities/user_aditional_data/user_pets";
import { AppError } from "../../../../errors/AppError";

export const deletePetsService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(user);
  const userPetRepository = AppDataSource.getTreeRepository(userPets);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  await userPetRepository.delete({ id: findUser.userAditionalData.id });

  return;
};
