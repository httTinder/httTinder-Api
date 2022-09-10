import AppDataSource from "../../../../data-source";
import { user } from "../../../../entities";
import { userAdditionalData } from "../../../../entities/user_aditional_data";
import { userMusicGenre } from "../../../../entities/user_aditional_data/user_music_genre";
import { AppError } from "../../../../errors/AppError";

export const deleteUserMusicService = async (id: string, uuid: string) => {
  const userRepository = AppDataSource.getRepository(user);
  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError(404, "user not found");
  }

  const DataRepository = AppDataSource.getRepository(userAdditionalData);
  const findData = await DataRepository.findOneBy({
    id: findUser.userAdditionalData.id,
  });

  if (!findData) {
    throw new AppError(404, "user not found");
  }

  const musicRepository = AppDataSource.getRepository(userMusicGenre);
  const findMusic = await musicRepository.delete({
    id: uuid,
    userAdditionalData: findData,
  });

  if (findMusic.affected == 0) {
    throw new AppError(404, "Hobbie not found");
  }

  return;
};
