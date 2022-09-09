import { AppError } from "./../../../../errors/AppError";
import { userPets } from "../../../../entities/user_aditional_data/user_pets/index";
import { user } from "../../../../entities/index";
import AppDataSource from "../../../../data-source";
import { userAditionalData } from "../../../../entities/user_aditional_data";
import { IUserPets } from "../../../../interfaces/user/user_additionalData/pets";

export const updatePetsService = async (
  dataSpecie: IUserPets,
  userId: string
) => {
  const { specie, uuid } = dataSpecie;

  if (!specie) {
    throw new AppError(400, "Invalid field");
  }

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

  const data = await userAddDataRepository.findOne({
    where: {
      id: findUser.userAditionalData.id,
    },
  });

  if (!data) {
    throw new AppError(404, "data not found");
  }

  const findPet = await userPetRepository.findOne({
    where: {
      id: uuid,
      userAditionalData: data,
    },
  });

  if (uuid && findPet) {
    userPetRepository.update(uuid, { specie: specie });
    return;
  }

  userPetRepository.create(dataSpecie);
  const pet = await userPetRepository.save(dataSpecie);

  if (!data?.pets) {
    userAddDataRepository.update(findUser.id, { pets: [pet] });
    return;
  }

  data.pets = [...data?.pets, pet];

  return;
};
