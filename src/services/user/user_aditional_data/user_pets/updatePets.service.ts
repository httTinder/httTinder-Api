import { userPets } from "../../../../entities/user_aditional_data/user_pets/index";
import { user } from "../../../../entities/index";
import AppDataSource from "../../../../data-source";
import { AppError } from "../../../../errors/AppError";
import { userAditionalData } from "../../../../entities/user_aditional_data";

export const updatePetsService = async (
  dataSpecie: string,
  userId: string,
  itemId: string
) => {
  const userRepository = AppDataSource.getRepository(user);
  const userPetRepository = AppDataSource.getRepository(userPets);
  const userAddDataRepository = AppDataSource.getRepository(userAditionalData);

  // colocar um id no body da requisicao do item q vamos editar da tabela
  // e ai fazer a verificação se esse id existe, se existir ele faz o update se não eh adicioanr

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
