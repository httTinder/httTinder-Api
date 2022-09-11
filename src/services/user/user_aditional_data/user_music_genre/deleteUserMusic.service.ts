import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userAdditionalData } from "../../../../entities/user_aditional_data";
import { userMusicGenre } from "../../../../entities/user_aditional_data/user_music_genre";
import { AppError } from "../../../../errors/AppError";

export const deleteUserMusicService = async (
  userId: string,
  idToDelete: string,
  authUserId: string
) : Promise<void> => {

  if (idToDelete === undefined) {
    throw new AppError(400, "Review required fields");
  }
  const userRepository = AppDataSource.getRepository(user);

  const musicRepository = AppDataSource.getRepository(userMusicGenre);

  const userAddDataRepository = AppDataSource.getRepository(userAdditionalData);

  const findUser = await userRepository.findOneBy({
    id: userId,
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

  findAddData.userMusicGenre.forEach((mus) => ids.push(mus.id));

  const verify = ids.find((mus) => mus === idToDelete);

  if (!verify && !findUser.isAdm) {
    throw new AppError(403, `missing authorization permissions`);
  }

  const musicToDelete = await musicRepository.delete({
    id: idToDelete,
  });

  if (musicToDelete.affected == 0) {
    throw new AppError(404, "Music not found");
  }

  return;
};
