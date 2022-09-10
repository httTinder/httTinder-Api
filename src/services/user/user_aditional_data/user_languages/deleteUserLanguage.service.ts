import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userAdditionalData } from "../../../../entities/user_aditional_data";
import { userLanguages } from "../../../../entities/user_aditional_data/user_languages";
import { AppError } from "../../../../errors/AppError";

export const deleteUserLanguageService = async (
  userId: string,
  uuid: string
) => {
  const userRepository = AppDataSource.getRepository(user);

  const userAddDataRepository = AppDataSource.getRepository(userAdditionalData);

  const userLanguagueRepository = AppDataSource.getRepository(userLanguages);

  const findUser = await userRepository.findOne({ where: { id: userId } });

  if (!findUser) {
    throw new AppError(404, "user not found");
  }

  const findData = await userAddDataRepository.findOne({
    where: {
      id: findUser.userAdditionalData.id,
    },
  });

  if (!findData) {
    throw new AppError(404, "user additional data is required");
  }

  const findLanguage = await userLanguagueRepository.delete({
    id: uuid,
    userAdditionalData: findData,
  });

  if (findLanguage.affected == 0) {
    throw new AppError(404, "Language not found");
  }

  return;
};
