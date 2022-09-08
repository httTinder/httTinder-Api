import { userPets } from "./../../../../entities/user_aditional_data/user_pets/index";
import { user } from "./../../../../entities/index";
import AppDataSource from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";

export const updatePetsService = async (data: string, userId: string) => {
  const userRepository = AppDataSource.getRepository(user);
  const userPetRepository = AppDataSource.getRepository(userPets);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  let additionalData = findUser.userAditionalData;

  if (!additionalData.pets) {
    const newPet = userPetRepository.create();
    await userPetRepository.save(newPet);

    await userPetRepository.update(additionalData.id, { specie: data });
  }

};
