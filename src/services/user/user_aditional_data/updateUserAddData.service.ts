import AppDataSource from "../../../data-source";
import { user } from "../../../entities";
import { userAdditionalData } from "../../../entities/user_aditional_data";
import { AppError } from "../../../errors/AppError";
import { IUserAddDataRequest } from "../../../interfaces/user/user_additionalData";

export const userAdditionalDataService = async (
  data: IUserAddDataRequest,
  userId: string
) => {
  const { kids } = data;
  let { kidsQnt } = data;

  if (!kids) {
    kidsQnt = null;
  }

  const userRepository = AppDataSource.getRepository(user);

  const additionalDataRepository =
    AppDataSource.getRepository(userAdditionalData);

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  if (!findUser.userAdditionalData) {
    additionalDataRepository.create(data);

    data = await additionalDataRepository.save(data);

    userRepository.update(findUser.id, {
      userAdditionalData: data,
    });

    return;
  }

  additionalDataRepository.update(findUser.userAdditionalData.id, {
    kids,
    kidsQnt,
  });
  return true;
};
