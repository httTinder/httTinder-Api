import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userAditionalData } from "../../../../entities/user_aditional_data";
import { userLanguages } from "../../../../entities/user_aditional_data/user_languages";
import { AppError } from "../../../../errors/AppError";

export const deleteUserLanguageService = async (
  userId: string,
  uuid: string
) => {
  const userRepository = AppDataSource.getRepository(user);

  const userAddDataRepository = AppDataSource.getRepository(userAditionalData);

  const userLanguagueRepository = AppDataSource.getRepository(userLanguages);

  const findUser = await userRepository.findOne({ where: { id: userId } });

  if (!findUser) {
    throw new AppError(404, "user not found");
  }

  const findData = await userAddDataRepository.findOne({
    where: {
      id: findUser.userAditionalData.id,
    },
  });

  if (!findData) {
    throw new AppError(404, "data not found");
  }

  const findLanguage = await userLanguagueRepository.delete({
    id: uuid,
    userAditionalData: findData,
  });

  if (findLanguage.affected == 0) {
    throw new AppError(404, "Language not found");
  }

  return;
};
