import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userAdditionalData } from "../../../../entities/user_aditional_data";
import { userLanguages } from "../../../../entities/user_aditional_data/user_languages";
import { AppError } from "../../../../errors/AppError";

export const deleteUserLanguageService = async (
  userId: string,
  idToDelete: string,
  authUserId: string
) : Promise<void> => {
  if (idToDelete === undefined) {
    throw new AppError(400, "Review required fields");
  }

  const userRepository = AppDataSource.getRepository(user);

  const userLanguagueRepository = AppDataSource.getRepository(userLanguages);

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
    throw new AppError(404, "additional data not found");
  }

  const findAuthUser = await userRepository.findOneBy({
    id: authUserId,
  });

  if (!findAuthUser) {
    throw new AppError(404, "auth user not found");
  }

  const ids: string[] = [];

  findAddData.userLanguages.forEach((lang) => ids.push(lang.id));

  const verify = ids.find((lang) => lang === idToDelete);

  if (!verify && !findUser.isAdm) {
    throw new AppError(403, `missing authorization permissions`);
  }

  const findLanguage = await userLanguagueRepository.delete({
    id: idToDelete,
  });

  if (findLanguage.affected == 0) {
    throw new AppError(404, "Language not found");
  }

  return;
};
