import AppDataSource from "../../../data-source";
import { user } from "../../../entities";
import { userAditionalData } from "../../../entities/user_aditional_data";
import { AppError } from "../../../errors/AppError";
import { IUserAddDataRequest } from "../../../interfaces/user/user_additionalData";

export const userAdditionalDataService = async (
  data: IUserAddDataRequest,
  userId: string
) => {
  const userRepository = AppDataSource.getRepository(user);
  const additionalDataRepository =
    AppDataSource.getRepository(userAditionalData);
  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  if (!findUser.userAditionalData) {
    additionalDataRepository.create(data);
    data = await additionalDataRepository.save(data);
    userRepository.update(findUser.id, {
      userAditionalData: data,
    });
    return;
  }

  additionalDataRepository.update(findUser.userAditionalData.id, { ...data });
  return true;
};
