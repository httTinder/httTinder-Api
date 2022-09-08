import { userPets } from "../../../../entities/user_aditional_data/user_pets/index";
import { user } from "../../../../entities/index";
import AppDataSource from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { userAditionalData } from "../../../../entities/user_aditional_data";

export const updatePetsService = async (dataSpecie: string, userId: string) => {
  const userRepository = AppDataSource.getRepository(user);
  const userPetRepository = AppDataSource.getRepository(userPets);
  const userAddDataRepository = AppDataSource.getRepository(userAditionalData);
g

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  if (!findUser.userAditionalData.pets) {
    userPetRepository.create({ specie: dataSpecie });
    const newPet = await userPetRepository.save({ specie: dataSpecie });

    userAddDataRepository.update(findUser.userAditionalData.id, newPet);

    return;
  }

  userPetRepository.update(findUser.userAditionalData.id, {
    specie: dataSpecie,
  });
  return;
};
