import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userAditionalData } from "../../../../entities/user_aditional_data";
import { userPets } from "../../../../entities/user_aditional_data/user_pets";
import { AppError } from "../../../../errors/AppError";

export const deletePetsService = async (userId: string, uuid: string) => {
  const userRepository = AppDataSource.getRepository(user);
  const userPetRepository = AppDataSource.getRepository(userPets);
  const userAddDataRepository = AppDataSource.getRepository(userAditionalData);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  const findData = await userAddDataRepository.findOne({
    where: {
      id: findUser.userAditionalData.id,
    },
  });

  if (!findData) {
    throw new AppError(404, "User additional data not found");
  }

  const findPet = await userPetRepository.delete({
    id: uuid,
    userAditionalData: findData,
  });

  if (findPet.affected == 0) {
    throw new AppError(404, "Pet not found");
  }

  return;
};
