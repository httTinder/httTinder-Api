import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userAditionalData } from "../../../../entities/user_aditional_data";
import { userHobbies } from "../../../../entities/user_aditional_data/user_hobbies";
import { AppError } from "../../../../errors/AppError";

const deleteUserHobbieService = async (id: string, uuid: string) => {
  const userRepository = AppDataSource.getRepository(user);
  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError(404, "user not found");
  }

  const DataRepository = AppDataSource.getRepository(userAditionalData);
  const findData = await DataRepository.findOneBy({
    id: findUser.userAditionalData.id,
  });

  if (!findData) {
    throw new AppError(404, "user not found");
  }

  const hobbieRepository = AppDataSource.getRepository(userHobbies);
  const findHobbie = await hobbieRepository.delete({
    id: uuid,
    userAditionalData: findData,
  });

  if (findHobbie.affected == 0) {
    throw new AppError(404, "Hobbie not found");
  }

  return
};

export default deleteUserHobbieService;
