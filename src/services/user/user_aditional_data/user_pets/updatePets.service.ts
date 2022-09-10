import { AppError } from "./../../../../errors/AppError";
import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities/index";
import { userPets } from "../../../../entities/user_aditional_data/user_pets/index";
import { userAdditionalData } from "../../../../entities/user_aditional_data";
import { IUserPets } from "../../../../interfaces/user/user_additionalData/pets";

export const updatePetsService = async (
  petData: IUserPets,
  userId: string
): Promise<string> => {
  const userRepository = AppDataSource.getRepository(user);

  const userPetRepository = AppDataSource.getRepository(userPets);

  const userAddDataRepository = AppDataSource.getRepository(userAdditionalData);

  const specie = petData.specie;
  const idToSearch = petData.uuid;

  if (!specie) {
    throw new AppError(404, "Invalid field");
  }

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  if (findUser!.userAdditionalData === null) {
    throw new AppError(404, "you must submit additional data first");
  }

  const findPet = await userPetRepository.findOneBy({ id: idToSearch });

  if (!findPet && idToSearch) {
    throw new AppError(404, `the '${idToSearch}' of pets sent was not found`);
  }

  if (findPet?.id == idToSearch) {
    await userPetRepository.update(findPet!.id, { specie });

    return `pet: '${specie}' updated successfully`;
  }

  const findAddData = await userAddDataRepository.findOne({
    where: { id: findUser?.userAdditionalData?.id },
  });

  const newPet = userPetRepository.create({
    specie,
    userAdditionalData: findAddData!,
  });

  await userPetRepository.save(newPet);

  return "pet was created successfully";
};
