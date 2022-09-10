import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userAdditionalData } from "../../../../entities/user_aditional_data";
import { userMusicGenre } from "../../../../entities/user_aditional_data/user_music_genre";
import { AppError } from "../../../../errors/AppError";

export const deleteUserMusicService = async (
  userId: string,
  idToDelete: string,
  authUserId: string
) => {

  if (idToDelete === undefined) {
    throw new AppError(400, "Review required fields");
  }
  const userRepository = AppDataSource.getRepository(user);

  const musicRepository = AppDataSource.getRepository(userMusicGenre);

  const DataRepository = AppDataSource.getRepository(userAdditionalData);

  const findUser = await userRepository.findOneBy({ id: userId });

  if (!findUser) {
    throw new AppError(404, "user not found");
  }

  const findData = await DataRepository.findOneBy({
    id: findUser.userAdditionalData.id,
  });

  if (!findData) {
    throw new AppError(404, "user not found");
  }

  if (findUser!.userAdditionalData === null) {
    throw new AppError(404, "additional data not found");
  }

  const findMusic = await musicRepository.findOneBy({
    id: idToDelete
  });

  const findAuthUser = await userRepository.findOneBy({ id: authUserId });

  if (!findAuthUser) {
    throw new AppError(404, "auth user not found");
  }

  if (findData?.id !== findMusic?.userAdditionalData?.id && !findAuthUser?.isAdm) {
 
    throw new AppError(403, `missing authorization permissions`);

  }
    

  // if (findMusic.affected == 0) {
  //   throw new AppError(404, "Music not found");
  // }

  return;
};
