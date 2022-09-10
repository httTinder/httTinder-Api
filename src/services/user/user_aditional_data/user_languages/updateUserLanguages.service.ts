import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userAdditionalData } from "../../../../entities/user_aditional_data";
import { userLanguages } from "../../../../entities/user_aditional_data/user_languages";
import { AppError } from "./../../../../errors/AppError";
import { IUserLanguage } from "./../../../../interfaces/user/user_aditional_data/user_languages/index";

export const updateUserLanguageService = async (
  languageData: IUserLanguage,
  userId: string
) => {
  /*
  const userRepository = AppDataSource.getRepository(user);
  const userAddDataRepository = AppDataSource.getRepository(userAdditionalData);
  const userLanguagesRepository = AppDataSource.getRepository(userLanguages);

  const { language, uuid } = languageData;

  if (!language) {
    throw new AppError(400, "invalid field");
  }

  const findUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  const findData = await userAddDataRepository.findOne({
    where: {
      id: findUser.userAdditionalData.id,
    },
  });

  if (!findData) {
    throw new AppError(404, "data not found");
  }

  const findLanguage = await userLanguagesRepository.findOne({
    where: {
      id: uuid,
      userAdditionalData: findData,
    },
  });

  if (!findLanguage) {
    throw new AppError(404, "Language not found");
  }

  if (uuid && findLanguage !== undefined) {
    userLanguagesRepository.update(uuid, {
      language: language,
    });
    return;
  }

  userLanguagesRepository.create(languageData);

  const newLanguage = await userLanguagesRepository.save(languageData);

  if (!findData?.languages) {
    userAddDataRepository.update(findUser.id, {
      languages: [newLanguage],
    });
    return;
  }

  findData.languages = [...findData?.languages, newLanguage];

  await userAddDataRepository.save(findData);
*/
  return;
};
