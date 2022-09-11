import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userAdditionalData } from "../../../../entities/user_aditional_data";
import { userHobbies } from "../../../../entities/user_aditional_data/user_hobbies";
import { AppError } from "../../../../errors/AppError";

const deleteUserHobbieService = async (
  userId: string,
  idToDelete: string,
  authUserId: string
): Promise<void> => {
  if (idToDelete === undefined) {
    throw new AppError(400, "Review required fields");
  }

  const userRepository = AppDataSource.getRepository(user);

  const hobbieRepository = AppDataSource.getRepository(userHobbies);

  const userAddDataRepository = AppDataSource.getRepository(userAdditionalData);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "user not found");
  }

  const findAddData = await userAddDataRepository.findOne({
    where: { id: findUser?.userAdditionalData?.id },
  });

  if (!findAddData) {
    throw new AppError(404, "no additional data found");
  }
  const findAuthUser = await userRepository.findOneBy({
    id: authUserId,
  });
  
  if (!findAuthUser) {
    throw new AppError(404, "auth user not found");
  }
  const ids: string[] = [];

  findAddData.pets.forEach((hobbies) => ids.push(hobbies.id));

  const verify = ids.find((hobbies) => hobbies === idToDelete);

  if (!verify && !findUser.isAdm) {
    throw new AppError(403, `missing authorization permissions`);
  }

  const hobbieToDelete = await hobbieRepository.delete({
    id: idToDelete,
  });

  if (hobbieToDelete.affected == 0) {
    throw new AppError(404, "Hobbie not found");
  }

  return;
};

export default deleteUserHobbieService;
