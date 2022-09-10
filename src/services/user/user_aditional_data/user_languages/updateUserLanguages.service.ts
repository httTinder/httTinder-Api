import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userAdditionalData } from "../../../../entities/user_aditional_data";
import { userLanguages } from "../../../../entities/user_aditional_data/user_languages";
import { AppError } from "./../../../../errors/AppError";
import { IUserLanguage } from "./../../../../interfaces/user/user_aditional_data/user_languages/index";

export const updateUserLanguageService = async (
  languageData: IUserLanguage,
  userId: string
) : Promise<string> => {  
  const userRepository = AppDataSource.getRepository(user);

  const userAddDataRepository = AppDataSource.getRepository(userAdditionalData);

  const userLanguagesRepository = AppDataSource.getRepository(userLanguages);

  const language = languageData.language;
  const idToSearch = languageData.uuid;

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

  if (findUser!.userAdditionalData === null) {
    throw new AppError(404, "you must submit additional data first");
  }

  const findAddData = await userAddDataRepository.findOne({
    where: { id: findUser?.userAdditionalData?.id },
  });

  
  if (!findAddData) {
    throw new AppError(404, "you must submit additional data first");
  }

  const findLanguages = await userLanguagesRepository.findOneBy({ id: idToSearch });

  if (!findLanguages &&  idToSearch) {
    throw new AppError(
      404,
      `the '${idToSearch}' of languages sent was not found`
    );
  }

  if (findLanguages && idToSearch) {
    userLanguagesRepository.update(idToSearch, { language });

    return `language: '${language}' updated successfully`;
  }


  const newLanguage = userLanguagesRepository.create({
    language,
    userAdditionalData: findAddData,
  });

  const languages = await userLanguagesRepository.save(newLanguage)

  if (!findAddData?.userLanguages) {
    userAddDataRepository.update(findUser.id, { userLanguages: [languages] });
  }

  await userLanguagesRepository.save(newLanguage)

  return "language was created successfully"
};
