import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userAdditionalData } from "../../../../entities/user_aditional_data";
import { userPets } from "../../../../entities/user_aditional_data/user_pets";
import { AppError } from "../../../../errors/AppError";

export const deletePetsService = async (
  userId: string,
  idToDelete: string,
  authUserId: string
) : Promise<void> => {
  
  if (idToDelete === undefined) {
    throw new AppError(400, "Review required fields");
  }

  const userRepository = AppDataSource.getRepository(user);

  const userPetRepository = AppDataSource.getRepository(userPets);

  const userAddDataRepository = AppDataSource.getRepository(userAdditionalData);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  const findAddData = await userAddDataRepository.findOne({
    where: { id: findUser?.userAdditionalData?.id },
  });

  if (!findAddData) {
    throw new AppError(404, "additional data not found");
  }

  const findAuthUser = await userRepository.findOneBy({
    id: authUserId,
  });

  if (!findAuthUser) {
    throw new AppError(404, "auth user not found");
  }

  const ids: string[] = [];

  findAddData.pets.forEach((pet) => ids.push(pet.id));

  const verify = ids.find((pet) => pet === idToDelete);

  if (!verify && !findUser.isAdm) {
    throw new AppError(403, `missing authorization permissions`);
  }

  const petToDelete = await userPetRepository.delete({
    id: idToDelete,
  });

  if (petToDelete.affected == 0) {
    throw new AppError(404, "Pet not found");
  }

  return;
};
